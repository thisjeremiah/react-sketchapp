'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('../types');

var _hashStyle = require('./hashStyle');

var _hashStyle2 = _interopRequireDefault(_hashStyle);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this borrows heavily from react-native's RCTFont class
// thanks y'all
// https://github.com/facebook/react-native/blob/master/React/Views/RCTFont.mm

var FONT_STYLES = {
  normal: false,
  italic: true,
  oblique: true
};
/* eslint-disable no-bitwise, quote-props */


var FONT_WEIGHTS = {
  normal: NSFontWeightRegular,
  bold: NSFontWeightBold,
  '100': NSFontWeightUltraLight,
  '200': NSFontWeightThin,
  '300': NSFontWeightLight,
  '400': NSFontWeightRegular,
  '500': NSFontWeightMedium,
  '600': NSFontWeightSemibold,
  '700': NSFontWeightBold,
  '800': NSFontWeightHeavy,
  '900': NSFontWeightBlack
};

var isItalicFont = function isItalicFont(font) {
  var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);
  var symbolicTraits = traits[NSFontSymbolicTrait].unsignedIntValue();

  return (symbolicTraits & NSFontItalicTrait) !== 0;
};

var isCondensedFont = function isCondensedFont(font) {
  var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);
  var symbolicTraits = traits[NSFontSymbolicTrait].unsignedIntValue();

  return (symbolicTraits & NSFontCondensedTrait) !== 0;
};

var weightOfFont = function weightOfFont(font) {
  var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);

  var weight = traits[NSFontWeightTrait].doubleValue();
  if (weight === 0.0) {
    var weights = Object.keys(FONT_WEIGHTS);
    for (var i = 0; i < weights.length; i += 1) {
      var w = weights[i];

      if (font.fontName().toLowerCase().endsWith(w)) {
        return FONT_WEIGHTS[w];
      }
    }
  }

  return weight;
};

var fontNamesForFamilyName = function fontNamesForFamilyName(familyName) {
  var manager = NSFontManager.sharedFontManager();
  var members = NSArray.arrayWithArray(manager.availableMembersOfFontFamily(familyName));

  var results = [];
  for (var i = 0; i < members.length; i += 1) {
    results.push(members[i][0]);
  }

  return results;
};

var useCache = true;
var _cache = new Map();

var getCached = function getCached(key) {
  if (!useCache) return undefined;
  return _cache.get(key);
};

var findFont = function findFont(style) {
  var cacheKey = (0, _hashStyle2.default)(style);

  var font = getCached(cacheKey);
  if (font) {
    return font;
  }
  var defaultFontFamily = NSFont.systemFontOfSize(14).familyName();
  var defaultFontWeight = NSFontWeightRegular;
  var defaultFontSize = 14;

  var fontSize = defaultFontSize;
  var fontWeight = defaultFontWeight;
  // Default to Helvetica if fonts are missing
  var familyName =
  // Must use two equals (==) for compatibility with Cocoascript
  // eslint-disable-next-line eqeqeq
  defaultFontFamily == _constants.APPLE_BROKEN_SYSTEM_FONT ? 'Helvetica' : defaultFontFamily;
  var isItalic = false;
  var isCondensed = false;

  if (style.fontSize) {
    fontSize = style.fontSize;
  }

  if (style.fontFamily) {
    familyName = style.fontFamily;
  }

  if (style.fontStyle) {
    isItalic = FONT_STYLES[style.fontStyle] || false;
  }

  if (style.fontWeight) {
    fontWeight = FONT_WEIGHTS[style.fontWeight] || NSFontWeightRegular;
  }

  var didFindFont = false;

  // Handle system font as special case. This ensures that we preserve
  // the specific metrics of the standard system font as closely as possible.
  if (familyName === defaultFontFamily || familyName === 'System') {
    font = NSFont.systemFontOfSize_weight(fontSize, fontWeight);

    if (font) {
      didFindFont = true;

      if (isItalic || isCondensed) {
        var fontDescriptor = font.fontDescriptor();
        var symbolicTraits = fontDescriptor.symbolicTraits();
        if (isItalic) {
          symbolicTraits |= NSFontItalicTrait;
        }

        if (isCondensed) {
          symbolicTraits |= NSFontCondensedTrait;
        }

        fontDescriptor = fontDescriptor.fontDescriptorWithSymbolicTraits(symbolicTraits);
        font = NSFont.fontWithDescriptor_size(fontDescriptor, fontSize);
      }
    }
  }

  var fontNames = fontNamesForFamilyName(familyName);

  // Gracefully handle being given a font name rather than font family, for
  // example: "Helvetica Light Oblique" rather than just "Helvetica".
  if (!didFindFont && fontNames.length === 0) {
    font = NSFont.fontWithName_size(familyName, fontSize);
    if (font) {
      // It's actually a font name, not a font family name,
      // but we'll do what was meant, not what was said.
      familyName = font.familyName();
      fontWeight = style.fontWeight ? fontWeight : weightOfFont(font);
      isItalic = style.fontStyle ? isItalic : isItalicFont(font);
      isCondensed = isCondensedFont(font);
    } else {
      log('Unrecognized font family \'' + familyName + '\'');
      font = NSFont.systemFontOfSize_weight(fontSize, fontWeight);
    }
  }

  // Get the closest font that matches the given weight for the fontFamily
  var closestWeight = Infinity;
  for (var i = 0; i < fontNames.length; i += 1) {
    var match = NSFont.fontWithName_size(fontNames[i], fontSize);

    if (isItalic === isItalicFont(match) && isCondensed === isCondensedFont(match)) {
      var testWeight = weightOfFont(match);

      if (Math.abs(testWeight - fontWeight) < Math.abs(closestWeight - fontWeight)) {
        font = match;

        closestWeight = testWeight;
      }
    }
  }

  // If we still don't have a match at least return the first font in the fontFamily
  // This is to support built-in font Zapfino and other custom single font families like Impact
  if (!font) {
    if (fontNames.length > 0) {
      font = NSFont.fontWithName_size(fontNames[0], fontSize);
    }
  }

  // TODO(gold): support opentype features: small-caps & number types

  if (font) {
    _cache.set(cacheKey, font);
  }

  return font;
};

exports.default = findFont;