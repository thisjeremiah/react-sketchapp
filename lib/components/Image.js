'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageSourcePropType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stylesheet = require('../stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _ViewStylePropTypes = require('./ViewStylePropTypes');

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

var _ResizingConstraintPropTypes = require('./ResizingConstraintPropTypes');

var _ResizingConstraintPropTypes2 = _interopRequireDefault(_ResizingConstraintPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageURISourcePropType = _propTypes2.default.shape({
  uri: _propTypes2.default.string.isRequired,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number
  // bundle: PropTypes.string,
  // method: PropTypes.string,
  // headers: PropTypes.objectOf(PropTypes.string),
  // body: PropTypes.string,
  // cache: PropTypes.oneOf(['default', 'reload', 'force-cache', 'only-if-cached']),
  // scale: PropTypes.number,
});

var ImageSourcePropType = exports.ImageSourcePropType = _propTypes2.default.oneOfType([ImageURISourcePropType,
// PropTypes.arrayOf(ImageURISourcePropType), // TODO: handle me
_propTypes2.default.string]);

var ResizeModePropType = _propTypes2.default.oneOf(['contain', 'cover', 'stretch', 'center', 'repeat', 'none']);

var propTypes = {
  name: _propTypes2.default.string,
  children: _propTypes2.default.any,
  defaultSource: ImageSourcePropType,
  resizeMode: ResizeModePropType,
  source: ImageSourcePropType,
  style: _propTypes2.default.shape(_extends({}, _ViewStylePropTypes2.default, {
    resizeMode: ResizeModePropType
  })),
  resizingConstraint: _propTypes2.default.shape(_extends({}, _ResizingConstraintPropTypes2.default))
};

var ResizeModes = {
  contain: 'Fit',
  cover: 'Fill',
  stretch: 'Stretch',
  center: 'Fill', // TODO(gold): implement ResizeModes.center
  repeat: 'Tile',
  none: 'Fill'
};

var Image = function (_React$Component) {
  _inherits(Image, _React$Component);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          source = _props.source,
          defaultSource = _props.defaultSource,
          resizeMode = _props.resizeMode,
          name = _props.name,
          resizingConstraint = _props.resizingConstraint;


      var style = _stylesheet2.default.flatten(this.props.style) || {};

      var sketchResizeMode = ResizeModes[resizeMode || style && style.resizeMode || 'cover'];
      if (source && typeof source !== 'string') {
        style = _extends({
          height: source.height,
          width: source.width
        }, style);
      }

      return _react2.default.createElement(
        'image',
        {
          style: style,
          source: source || defaultSource,
          name: name,
          resizeMode: sketchResizeMode,
          resizingConstraint: resizingConstraint
        },
        children
      );
    }
  }]);

  return Image;
}(_react2.default.Component);

Image.defaultProps = {
  name: 'Image'
};


Image.propTypes = propTypes;

exports.default = Image;