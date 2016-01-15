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

var _prop_types = require('./prop_types');

var _vendors_helper = require('./vendors_helper');

var _util = require('./util');

var VLayoutItem = (function (_React$Component) {
  function VLayoutItem() {
    _classCallCheck(this, VLayoutItem);

    _get(Object.getPrototypeOf(VLayoutItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(VLayoutItem, _React$Component);

  _createClass(VLayoutItem, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        _extends({
          'data-display-name': 'VLayoutItem'
        }, this.props, {
          className: this.props.className ? this.props.className + ' ' + this._getClassname() : this._getClassname(),
          style: _lodash2['default'].extend(this._getStyles(), this.props.style)
        }),
        this.props.children
      );
    }
  }, {
    key: '_getStyles',
    value: function _getStyles() {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var flexGrow = _props.flexGrow;
      var _gutterTop = _props._gutterTop;
      var _gutterBottom = _props._gutterBottom;

      var style = { width: width, height: height };

      if (flexGrow) {
        var grow = flexGrow === true ? 1 : flexGrow;
        style = (0, _vendors_helper.prefixFlexProp)(style, grow, 0, 0);
      } else {
        style = (0, _vendors_helper.prefixFlexProp)(style, 0, 0, 'auto');
      }

      var align = (0, _util.normalizeJustify)(this.props.justify);

      // Browser vendor prefixes
      // align-self
      style.WebkitAlignSelf = align;
      style.msFlexItemAlign = (0, _vendors_helper.cssValueToOldFlexSyntax)(align);
      style.alignSelf = align;

      if (_gutterTop) {
        style.marginTop = _gutterTop;
      }
      if (_gutterBottom) {
        style.marginBottom = _gutterBottom;
      }

      return style;
    }
  }, {
    key: '_getClassname',
    value: function _getClassname() {
      if (this._mustGrowChild()) {
        return 'appLayoutGrowChildFlex';
      }

      return '';
    }
  }, {
    key: '_mustGrowChild',
    value: function _mustGrowChild() {
      return this.props.flexGrow || this.props.height;
    }
  }]);

  return VLayoutItem;
})(_react2['default'].Component);

exports['default'] = VLayoutItem;

VLayoutItem.propTypes = _prop_types.VLayoutItemPropTypes;
VLayoutItem._isLayoutChild = true;
module.exports = exports['default'];