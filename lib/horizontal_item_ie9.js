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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _util = require('./util');

var _prop_types = require('./prop_types');

var HLayoutItemIE9 = (function (_React$Component) {
  function HLayoutItemIE9() {
    _classCallCheck(this, HLayoutItemIE9);

    _get(Object.getPrototypeOf(HLayoutItemIE9.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(HLayoutItemIE9, _React$Component);

  _createClass(HLayoutItemIE9, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.node = _reactDom2['default'].findDOMNode(this);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this._requiresExtraWrapper()) {
        return _react2['default'].createElement(
          'div',
          _extends({ ref: 'inner',
            'data-display-name': 'HLayoutItem'
          }, this.props, {
            className: this.props.className ? this.props.className + ' ' + this._getClassname() : this._getClassname(),
            style: _lodash2['default'].extend(this._getInnerStyles(), this._getWrapperStyles(), this.props.style)
          }),
          this.props.children
        );
      } else {
        return _react2['default'].createElement(
          'div',
          _extends({ 'data-display-name': 'HLayoutItemWrapper' }, this.props, { style: _lodash2['default'].extend(this._getWrapperStyles()) }),
          _react2['default'].createElement(
            'div',
            { style: { display: 'inline-block', verticalAlign: 'middle', width: 0, overflow: 'hidden' } },
            'a'
          ),
          _react2['default'].createElement(
            'div',
            { ref: 'inner',
              'data-display-name': 'HLayoutItem',
              className: this._getClassname(),
              style: _lodash2['default'].extend(this._getInnerStyles(), { width: '100%' }, this.props.style)
            },
            this.props.children
          )
        );
      }
    }
  }, {
    key: '_unsetLayoutStyles',
    value: function _unsetLayoutStyles() {
      var style = this.node.style;

      if (!(0, _util.didDefineWidth)(this.props)) {
        style.width = '';
      }

      if (this._requiresExtraWrapper()) {
        style.lineHeight = '';
      }

      if (this.props.align === 'stretch') {
        style.height = '';
        this.node.className = '';
      }
    }
  }, {
    key: '_measureWidth',
    value: function _measureWidth() {
      return getComputedStyle(this.node).width;
    }
  }, {
    key: '_applyInheritedStyles',
    value: function _applyInheritedStyles(whiteSpace, textAlign, lineHeight) {
      var style = _reactDom2['default'].findDOMNode(this.refs.inner).style;

      var userStyle = this.props.style || {};

      style.whiteSpace = userStyle.whiteSpace || whiteSpace;
      style.textAlign = userStyle.textAlign || textAlign;
      style.lineHeight = userStyle.lineHeight || lineHeight;
    }
  }, {
    key: '_applyWidth',
    value: function _applyWidth(width) {
      this.node.style.width = width;
    }
  }, {
    key: '_setContainerHeight',
    value: function _setContainerHeight(height) {
      if (this._requiresExtraWrapper()) {
        this.node.style.lineHeight = height;
      } else if (this.props.align === 'stretch') {
        this.node.style.height = '100%';
        this.node.className = this._getClassname();
      }
    }
  }, {
    key: '_getWrapperStyles',
    value: function _getWrapperStyles() {
      var style = {
        display: 'inline-block'
      };
      var _props = this.props;
      var _gutterLeft = _props._gutterLeft;
      var _gutterRight = _props._gutterRight;

      style.width = this.props.width;

      if (_gutterLeft) {
        style.marginLeft = _gutterLeft;
      }
      if (_gutterRight) {
        style.marginRight = _gutterRight;
      }

      if (this._requiresExtraWrapper()) {
        style.verticalAlign = 'top';
      }

      return style;
    }
  }, {
    key: '_getInnerStyles',
    value: function _getInnerStyles() {
      var style = {
        display: 'inline-block'
      };

      style.height = this.props.height;

      var align = this.props.align;
      if (align === 'stretch') {
        style.verticalAlign = 'top';
      } else {
        style.verticalAlign = align;
      }

      return style;
    }
  }, {
    key: '_getClassname',
    value: function _getClassname() {
      var align = this.props.align;
      if (align === 'stretch' || this.props.height) {
        return 'appLayoutGrowChildStatic';
      }
      return '';
    }
  }, {
    key: '_requiresExtraWrapper',

    /**
     * In order to match flexbox behavior where align:baseline elements only align baselines with each other, we need to
     * wrap other align types in a wrapper so that their baselines don't align.
     */
    value: function _requiresExtraWrapper() {
      var align = this.props.align;
      return align === 'middle' || align === 'bottom';
    }
  }]);

  return HLayoutItemIE9;
})(_react2['default'].Component);

exports['default'] = HLayoutItemIE9;

HLayoutItemIE9.propTypes = _prop_types.HLayoutItemPropTypes;
HLayoutItemIE9._isLayoutChild = true;
module.exports = exports['default'];