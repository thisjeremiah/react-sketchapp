'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _errorStackParser = require('error-stack-parser');

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  redbox: {
    padding: 10,
    width: 480,
    backgroundColor: 'rgb(204, 0, 0)'
  },
  frame: {},
  message: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: 'white'
  },
  stack: {
    fontFamily: 'Monaco',
    marginTop: 20,
    color: 'white'
  }
};

var propTypes = {
  error: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(Error), _propTypes2.default.string]).isRequired
  // filename: PropTypes.string,
  // editorScheme: PropTypes.string,
  // useLines: PropTypes.bool,
  // useColumns: PropTypes.bool,
};

var RedBox = function (_React$Component) {
  _inherits(RedBox, _React$Component);

  function RedBox() {
    _classCallCheck(this, RedBox);

    return _possibleConstructorReturn(this, (RedBox.__proto__ || Object.getPrototypeOf(RedBox)).apply(this, arguments));
  }

  _createClass(RedBox, [{
    key: 'renderFrames',
    value: function renderFrames(frames) {
      return frames.map(function (f, index) {
        return _react2.default.createElement(
          _Text2.default,
          { key: index, style: styles.stack },
          f.functionName
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var error = this.props.error;


      if (typeof error === 'string') {
        return _react2.default.createElement(
          _View2.default,
          { name: 'RedBox', style: styles.redbox },
          _react2.default.createElement(
            _Text2.default,
            { name: 'Message', style: styles.message },
            'Error: ' + error
          )
        );
      }

      var frames = void 0;
      var parseError = void 0;

      var frameChildren = void 0;

      try {
        frames = _errorStackParser2.default.parse(error);
      } catch (e) {
        parseError = new Error('Failed to parse stack trace. Stack trace information unavailable.');
      }

      if (parseError) {
        frameChildren = _react2.default.createElement(
          _View2.default,
          { style: styles.frame, key: 0 },
          _react2.default.createElement(
            _View2.default,
            null,
            parseError.message
          )
        );
      }

      if (frames) {
        frameChildren = this.renderFrames(frames);
      }

      return _react2.default.createElement(
        _View2.default,
        { name: 'RedBox', style: styles.redbox },
        _react2.default.createElement(
          _Text2.default,
          { name: 'Message', style: styles.message },
          error.name + ': ' + error.message
        ),
        _react2.default.createElement(
          _View2.default,
          { name: 'Frames', style: styles.stack },
          frameChildren
        )
      );
    }
  }]);

  return RedBox;
}(_react2.default.Component);

RedBox.defaultProps = {
  useLines: true,
  useColumns: true
};


RedBox.propTypes = propTypes;

exports.default = RedBox;