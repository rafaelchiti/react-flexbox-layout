'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('./util');

var _prop_types = require('./prop_types');

var VLayoutItemIE9 = (function (_React$Component) {
  function VLayoutItemIE9() {
    _classCallCheck(this, VLayoutItemIE9);

    _get(Object.getPrototypeOf(VLayoutItemIE9.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(VLayoutItemIE9, _React$Component);

  _createClass(VLayoutItemIE9, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.node = _reactDom2['default'].findDOMNode(this);
      this.inner = _reactDom2['default'].findDOMNode(this.refs.inner);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        _extends({
          'data-display-name': 'VLayoutItemWrapper'
        }, this.props, {
          style: _lodash2['default'].extend(this._getItemWrapperStyles(), this.props.style)
        }),
        _react2['default'].createElement(
          'div',
          { ref: 'inner', style: this._getItemStyles(),
            'data-display-name': 'VLayoutItem',
            className: this._getClassname()
          },
          this.props.children
        )
      );
    }
  }, {
    key: '_unsetLayoutStyles',
    value: function _unsetLayoutStyles() {
      var style = this.node.style;

      if (!(0, _util.didDefineWidth)(this.props)) {
        style.width = '';
      }

      if (!(0, _util.didDefineHeight)(this.props)) {
        style.height = '';
      }

      style.textAlign = '';
      this.inner.style.textAlign = '';
    }
  }, {
    key: '_applyInheritedStyles',
    value: function _applyInheritedStyles(textAlign) {
      var justify = this.props.justify;
      if (justify !== 'stretch') {
        this.node.style.textAlign = justify;
      }

      var userStyle = this.props.style || {};

      this.inner.style.textAlign = userStyle.textAlign || textAlign;
    }
  }, {
    key: '_measureHeight',
    value: function _measureHeight() {
      return window.getComputedStyle(this.node).height;
    }
  }, {
    key: '_applyHeight',
    value: function _applyHeight(height) {
      this.node.style.height = height;
    }
  }, {
    key: '_getItemWrapperStyles',
    value: function _getItemWrapperStyles() {
      var _props = this.props;
      var height = _props.height;
      var _gutterTop = _props._gutterTop;
      var _gutterBottom = _props._gutterBottom;

      var styles = {
        display: 'block',
        height: height
      };

      var gutterType = 'margin';
      if (_gutterTop) {
        styles[gutterType + 'Top'] = _gutterTop;
      }
      if (_gutterBottom) {
        styles[gutterType + 'Bottom'] = _gutterBottom;
      }

      return styles;
    }
  }, {
    key: '_getItemStyles',
    value: function _getItemStyles() {
      var styles = {
        display: this.props.justify === 'stretch' ? 'block' : 'inline-block',
        width: this.props.width
      };

      if (this.props.flexGrow) {
        styles.height = '100%';
      }

      return styles;
    }
  }, {
    key: '_getClassname',
    value: function _getClassname() {
      if (this._mustGrowChild()) {
        return 'appLayoutGrowChildStatic';
      }

      return '';
    }
  }, {
    key: '_mustGrowChild',
    value: function _mustGrowChild() {
      return this.props.flexGrow || this.props.height;
    }
  }]);

  return VLayoutItemIE9;
})(_react2['default'].Component);

exports['default'] = VLayoutItemIE9;

VLayoutItemIE9.propTypes = _prop_types.VLayoutItemPropTypes;
VLayoutItemIE9._isLayoutChild = true;
module.exports = exports['default'];