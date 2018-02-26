'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layerGroup = require('../jsonUtils/layerGroup');

var _layerGroup2 = _interopRequireDefault(_layerGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_OPACITY = 1.0;

var SketchRenderer = function () {
  function SketchRenderer() {
    _classCallCheck(this, SketchRenderer);
  }

  _createClass(SketchRenderer, [{
    key: 'getDefaultGroupName',
    value: function getDefaultGroupName(
    // eslint-disable-next-line no-unused-vars
    props) {
      return 'Group';
    }
  }, {
    key: 'renderGroupLayer',
    value: function renderGroupLayer(layout, style, textStyle, props) {
      // Default SketchRenderer just renders an empty group

      // TODO(lmr): applying transform to the group would be ideal, but not sure if it's possible
      // if (style.transform !== undefined) {
      //   processTransform(layer, layout, style.transform);
      // }

      var opacity = style.opacity !== undefined ? style.opacity : DEFAULT_OPACITY;

      return _extends({}, (0, _layerGroup2.default)(layout.left, layout.top, layout.width, layout.height, opacity, props.resizingConstraint), {
        name: props.name || this.getDefaultGroupName(props)
      });
    }
  }, {
    key: 'renderBackingLayers',
    value: function renderBackingLayers(layout, style, textStyle,
    // eslint-disable-next-line no-unused-vars
    props,
    // eslint-disable-next-line no-unused-vars
    children) {
      return [];
    }
  }]);

  return SketchRenderer;
}();

module.exports = SketchRenderer;