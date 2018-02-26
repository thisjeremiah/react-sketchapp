'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SketchRenderer2 = require('./SketchRenderer');

var _SketchRenderer3 = _interopRequireDefault(_SketchRenderer2);

var _models = require('../jsonUtils/models');

var _symbol = require('../symbol');

var _hacksForJSONImpl = require('../jsonUtils/hacksForJSONImpl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import type { SJSymbolInstanceLayer, SJLayer, SJObjectId } from 'sketchapp-json-flow-types';


// type OverrideReferenceBase = {
//   objectId: SJObjectId,
//   name: string
// };

// type OverrideReference =
//   | ({ type: 'text' } & OverrideReferenceBase)
//   | ({ type: 'image' } & OverrideReferenceBase)
//   | ({
//     type: 'symbolInstance',
//     symbolId: string,
//     width: number,
//     height: number
//   } & OverrideReferenceBase);

var extractOverridesHelp = function extractOverridesHelp(subLayer, output) {
  if (subLayer._class === 'text' && !output.some(function (r) {
    return r.objectId === subLayer.do_objectID;
  })) {
    output.push({
      type: 'text',
      objectId: subLayer.do_objectID,
      name: subLayer.name
    });
    return;
  }

  if (subLayer._class === 'group' && subLayer.layers) {
    // here we're doing some look-ahead to see if this group contains a group
    // that contains text. this is the structure that will appear if the user
    // creates a `<Text />` element with a custom name
    var subGroup = subLayer.layers.find(function (l) {
      return l._class === 'group';
    });
    var textLayer = subGroup && subGroup.layers ? subGroup.layers.find(function (l) {
      return l._class === 'text';
    }) : null;
    if (textLayer) {
      output.push({
        type: 'text',
        objectId: textLayer.do_objectID,
        name: subLayer.name
      });
      return;
    }

    var shapeGroup = subLayer.layers && subLayer.layers.find(function (l) {
      return l._class === 'shapeGroup';
    });
    // here we're doing look-ahead to see if this group contains a shapeGroup
    // with an image fill. if it does we can do an image override on that
    // fill
    if (shapeGroup && shapeGroup._class === 'shapeGroup' && shapeGroup.style != null && shapeGroup.style.fills.some(function (f) {
      return f.image;
    })) {
      output.push({
        type: 'image',
        objectId: shapeGroup.do_objectID,
        name: subLayer.name
      });
    }
  }

  if (subLayer._class === 'symbolInstance') {
    output.push({
      type: 'symbolInstance',
      objectId: subLayer.do_objectID,
      name: subLayer.name,
      symbolId: subLayer.symbolID,
      width: subLayer.frame.width,
      height: subLayer.frame.height
    });
  }

  if ((subLayer._class === 'shapeGroup' || subLayer._class === 'artboard' || subLayer._class === 'group') && subLayer.layers) {
    subLayer.layers.forEach(function (subSubLayer) {
      return extractOverridesHelp(subSubLayer, output);
    });
  }
};

var extractOverrides = function extractOverrides(subLayers) {
  var output = [];
  subLayers.forEach(function (subLayer) {
    return extractOverridesHelp(subLayer, output);
  });
  return output;
};

var SymbolInstanceRenderer = function (_SketchRenderer) {
  _inherits(SymbolInstanceRenderer, _SketchRenderer);

  function SymbolInstanceRenderer() {
    _classCallCheck(this, SymbolInstanceRenderer);

    return _possibleConstructorReturn(this, (SymbolInstanceRenderer.__proto__ || Object.getPrototypeOf(SymbolInstanceRenderer)).apply(this, arguments));
  }

  _createClass(SymbolInstanceRenderer, [{
    key: 'renderGroupLayer',
    value: function renderGroupLayer(layout, style, textStyle, props) {
      var masterTree = (0, _symbol.getSymbolMasterByName)(props.masterName);

      var symbolInstance = (0, _models.makeSymbolInstance)((0, _models.makeRect)(layout.left, layout.top, layout.width, layout.height), masterTree.symbolID, props.name, props.resizingConstraint);

      if (!props.overrides) {
        return symbolInstance;
      }

      var overridableLayers = extractOverrides(masterTree.layers);

      var overrides = overridableLayers.reduce(function inject(memo, reference) {
        if (reference.type === 'symbolInstance') {
          // eslint-disable-next-line
          if (props.overrides.hasOwnProperty(reference.name)) {
            var _overrideValue = props.overrides[reference.name];
            if (typeof _overrideValue !== 'function' || typeof _overrideValue.masterName !== 'string') {
              throw new Error('##FIXME## SYMBOL INSTANCE SUBSTITUTIONS MUST BE PASSED THE CONSTRUCTOR OF THE OTHER SYMBOL');
            }

            var originalMaster = (0, _symbol.getSymbolMasterById)(reference.symbolId);
            var replacementMaster = (0, _symbol.getSymbolMasterByName)(_overrideValue.masterName);

            if (originalMaster.frame.width !== replacementMaster.frame.width || originalMaster.frame.height !== replacementMaster.frame.height) {
              throw new Error('##FIXME## SYMBOL MASTER SUBSTITUTIONS REQUIRE THAT MASTERS HAVE THE SAME DIMENSIONS');
            }

            var _nestedOverrides = extractOverrides((0, _symbol.getSymbolMasterByName)(_overrideValue.masterName).layers).reduce(inject, {});

            return _extends({}, memo, _defineProperty({}, reference.objectId, _extends({
              symbolID: replacementMaster.symbolID
            }, _nestedOverrides)));
          }

          var nestedOverrides = extractOverrides((0, _symbol.getSymbolMasterById)(reference.symbolId).layers).reduce(inject, {});

          return _extends({}, memo, _defineProperty({}, reference.objectId, nestedOverrides));
        }

        // eslint-disable-next-line
        if (!props.overrides.hasOwnProperty(reference.name)) {
          return memo;
        }

        var overrideValue = props.overrides[reference.name];

        if (reference.type === 'text') {
          if (typeof overrideValue !== 'string') {
            throw new Error('##FIXME## TEXT OVERRIDE VALUES MUST BE STRINGS');
          }
          return _extends({}, memo, _defineProperty({}, reference.objectId, overrideValue));
        }

        if (reference.type === 'image') {
          if (typeof overrideValue !== 'string') {
            throw new Error('##FIXME"" IMAGE OVERRIDE VALUES MUST BE VALID IMAGE HREFS');
          }
          return _extends({}, memo, _defineProperty({}, reference.objectId, (0, _models.makeJSONDataReference)((0, _hacksForJSONImpl.makeImageDataFromUrl)(overrideValue))));
        }

        return memo;
      }, {});

      symbolInstance.overrides = {};
      symbolInstance.overrides['0'] = overrides;

      return symbolInstance;
    }
  }]);

  return SymbolInstanceRenderer;
}(_SketchRenderer3.default);

module.exports = SymbolInstanceRenderer;