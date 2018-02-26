'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSymbolMaster = exports.makeSymbolInstance = exports.makeJSONDataReference = exports.makeRect = exports.makeImageFill = exports.makeColorFill = exports.makeColorFromCSS = undefined;
exports.generateID = generateID;

var _sketchConstants = require('sketch-constants');

var _normalizeCssColor = require('normalize-css-color');

var _normalizeCssColor2 = _interopRequireDefault(_normalizeCssColor);

var _hacksForJSONImpl = require('./hacksForJSONImpl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-mixed-operators, no-bitwise */
var lut = [];
for (var i = 0; i < 256; i += 1) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}
// Hack (http://stackoverflow.com/a/21963136)
function e7() {
  var d0 = Math.random() * 0xffffffff | 0;
  var d1 = Math.random() * 0xffffffff | 0;
  var d2 = Math.random() * 0xffffffff | 0;
  var d3 = Math.random() * 0xffffffff | 0;
  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}

// Keep track on previous numbers that are generated
var previousNumber = 1;

// Will always produce a unique Number (Int) based on of the current date
function generateIdNumber() {
  var date = Date.now();

  if (date <= previousNumber) {
    date = previousNumber += 1;
  } else {
    previousNumber = date;
  }

  return date;
}

function generateID() {
  return e7();
}

var safeToLower = function safeToLower(input) {
  if (typeof input === 'string') {
    return input.toLowerCase();
  }

  return input;
};

// Takes colors as CSS hex, name, rgb, rgba, hsl or hsla
var makeColorFromCSS = exports.makeColorFromCSS = function makeColorFromCSS(input) {
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var nullableColor = (0, _normalizeCssColor2.default)(safeToLower(input));
  var colorInt = nullableColor == null ? 0x00000000 : nullableColor;

  var _normalizeColor$rgba = _normalizeCssColor2.default.rgba(colorInt),
      r = _normalizeColor$rgba.r,
      g = _normalizeColor$rgba.g,
      b = _normalizeColor$rgba.b,
      a = _normalizeColor$rgba.a;

  return {
    _class: 'color',
    red: r / 255,
    green: g / 255,
    blue: b / 255,
    alpha: a * alpha
  };
};

// Solid color fill
var makeColorFill = exports.makeColorFill = function makeColorFill(cssColor) {
  return {
    _class: 'fill',
    isEnabled: true,
    color: makeColorFromCSS(cssColor),
    fillType: 0,
    noiseIndex: 0,
    noiseIntensity: 0,
    patternFillType: 1,
    patternTileScale: 1
  };
};

var makeImageFill = exports.makeImageFill = function makeImageFill(image) {
  var patternFillType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return {
    _class: 'fill',
    isEnabled: true,
    fillType: _sketchConstants.FillType.Pattern,
    image: image,
    noiseIndex: 0,
    noiseIntensity: 0,
    patternFillType: patternFillType,
    patternTileScale: 1
  };
};

// Used in frames, etc
var makeRect = exports.makeRect = function makeRect(x, y, width, height) {
  return {
    _class: 'rect',
    constrainProportions: false,
    x: x,
    y: y,
    width: width,
    height: height
  };
};

var makeJSONDataReference = exports.makeJSONDataReference = function makeJSONDataReference(image) {
  return {
    _class: 'MSJSONOriginalDataReference',
    _ref: 'images/' + generateID(),
    _ref_class: 'MSImageData',
    data: {
      _data: image.data().base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn)
      // TODO(gold): can I just declare this as a var instead of using Cocoa?
    },
    sha1: {
      _data: image.sha1().base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn)
    }
  };
};

var makeSymbolInstance = exports.makeSymbolInstance = function makeSymbolInstance(frame, symbolID, name, resizingConstraint) {
  return {
    _class: 'symbolInstance',
    horizontalSpacing: 0,
    verticalSpacing: 0,
    nameIsFixed: true,
    isVisible: true,
    do_objectID: generateID(),
    resizingConstraint: (0, _hacksForJSONImpl.makeResizeConstraint)(resizingConstraint),
    name: name,
    symbolID: symbolID,
    frame: frame
  };
};

var makeSymbolMaster = exports.makeSymbolMaster = function makeSymbolMaster(frame, symbolID, name) {
  return {
    _class: 'symbolMaster',
    do_objectID: generateID(),
    nameIsFixed: true,
    isVisible: true,
    backgroundColor: makeColorFromCSS('white'),
    hasBackgroundColor: false,
    name: name,
    changeIdentifier: generateIdNumber(),
    symbolID: symbolID,
    frame: frame
  };
};