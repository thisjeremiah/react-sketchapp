'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SketchRenderer2 = require('./SketchRenderer');

var _SketchRenderer3 = _interopRequireDefault(_SketchRenderer2);

var _textLayers = require('../jsonUtils/textLayers');

var _textLayers2 = _interopRequireDefault(_textLayers);

var _models = require('../jsonUtils/models');

var _TextStyles = require('../sharedStyles/TextStyles');

var _TextStyles2 = _interopRequireDefault(_TextStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextRenderer = function (_SketchRenderer) {
  _inherits(TextRenderer, _SketchRenderer);

  function TextRenderer() {
    _classCallCheck(this, TextRenderer);

    return _possibleConstructorReturn(this, (TextRenderer.__proto__ || Object.getPrototypeOf(TextRenderer)).apply(this, arguments));
  }

  _createClass(TextRenderer, [{
    key: 'getDefaultGroupName',
    value: function getDefaultGroupName(props) {
      return props.name || 'Text';
    }
  }, {
    key: 'renderBackingLayers',
    value: function renderBackingLayers(layout, style, textStyle, props) {
      // Append all text nodes's content into one string
      var name = '';
      if (props.textNodes) {
        props.textNodes.forEach(function (textNode) {
          name += textNode.content;
        });
      }

      var frame = (0, _models.makeRect)(0, 0, layout.width, layout.height);
      var layer = (0, _textLayers2.default)(frame, name, props.textNodes, props.resizingConstraint);

      var resolvedStyle = _TextStyles2.default.resolve(textStyle);
      if (resolvedStyle) {
        layer.style = resolvedStyle.sketchStyle;
        layer.style.sharedObjectID = resolvedStyle.sharedObjectID;
      }

      return [layer];
    }
  }]);

  return TextRenderer;
}(_SketchRenderer3.default);

module.exports = TextRenderer;