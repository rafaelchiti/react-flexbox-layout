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

var _vertical_item = require('./vertical_item');

var _vertical_item2 = _interopRequireDefault(_vertical_item);

var _prop_types = require('./prop_types');

var _util = require('./util');

var _vendors_helper = require('./vendors_helper');

exports['default'] = function (defaultGutter, gutterMultiplier, defaultGutterUnit) {
  var VLayout = (function (_React$Component) {
    function VLayout() {
      _classCallCheck(this, VLayout);

      _get(Object.getPrototypeOf(VLayout.prototype), 'constructor', this).apply(this, arguments);
    }

    _inherits(VLayout, _React$Component);

    _createClass(VLayout, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.onLayout && this.props.onLayout();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.props.onLayout && this.props.onLayout();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this = this;

        var gutterSizes = (0, _util.getVGutterSizes)(this.props.children, this.props.gutter);

        var children = (0, _util.mapNonEmpty)(this.props.children, function (child, index) {
          var props = (0, _util.makeVLayoutItemChildProps)(_this.props, child.props, index, gutterSizes, gutterMultiplier);

          if (child.type && child.type._isLayoutChild) {
            return _react2['default'].cloneElement(child, props);
          } else {
            return _react2['default'].createElement(
              _vertical_item2['default'],
              props,
              child
            );
          }
        });

        return _react2['default'].createElement(
          'div',
          _extends({
            'data-display-name': 'VLayout'
          }, this.props, {
            className: 'appLayoutVendoredFlex',
            style: _lodash2['default'].extend(this._getContainerStyles(), this.props.style)
          }),
          children
        );
      }
    }, {
      key: '_getContainerStyles',
      value: function _getContainerStyles() {
        var justifyItems = (0, _util.normalizeAlign)(this.props.alignItems);

        var styles = {
          width: this.props.width,
          height: this.props.height
        };

        // Flex with vendor prefixes:
        // display:flex
        // done through class name so we get vendor prefixes

        // flex-direction
        styles.WebkitBoxOrient = 'vertical';
        styles.WebkitBoxDirection = 'normal';
        styles.WebkitFlexDirection = 'column';
        styles.msFlexDirection = 'column';
        styles.flexDirection = 'column';
        // flex-wrap
        styles.WebkitFlexWrap = 'nowrap';
        styles.msFlexWrap = 'nowrap';
        styles.flexWrap = 'nowrap';
        // justify-content
        styles.WebkitBoxPack = (0, _vendors_helper.cssValueToOldFlexSyntax)(justifyItems);
        styles.WebkitJustifyContent = justifyItems;
        styles.msFlexPack = (0, _vendors_helper.cssValueToOldFlexSyntax)(justifyItems);
        styles.justifyContent = justifyItems;

        return styles;
      }
    }]);

    return VLayout;
  })(_react2['default'].Component);

  VLayout.propTypes = _prop_types.VLayoutPropTypes;
  VLayout.defaultProps = _lodash2['default'].extend({}, _prop_types.VLayoutDefaultPropTypes, {
    gutter: defaultGutter,
    gutterUnit: defaultGutterUnit
  });

  return VLayout;
};

module.exports = exports['default'];