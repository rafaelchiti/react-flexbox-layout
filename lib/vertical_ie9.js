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

var _vertical_item_ie9 = require('./vertical_item_ie9');

var _vertical_item_ie92 = _interopRequireDefault(_vertical_item_ie9);

var _prop_types = require('./prop_types');

var _util = require('./util');

var _update_engine_ie9 = require('./update_engine_ie9');

exports['default'] = function (defaultGutter, gutterMultiplier, defaultGutterUnit) {
  var VLayoutIE9 = (function (_React$Component) {
    function VLayoutIE9() {
      _classCallCheck(this, VLayoutIE9);

      _get(Object.getPrototypeOf(VLayoutIE9.prototype), 'constructor', this).apply(this, arguments);
    }

    _inherits(VLayoutIE9, _React$Component);

    _createClass(VLayoutIE9, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        (0, _update_engine_ie9.register)(this);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.node = _reactDom2['default'].findDOMNode(this);
        (0, _update_engine_ie9.requestAsyncUpdate)();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        (0, _update_engine_ie9.deregister)(this);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        (0, _update_engine_ie9.requestAsyncUpdate)();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this = this;

        this.itemsRefs = [];
        this.gutterSizes = (0, _util.getVGutterSizes)(this.props.children, this.props.gutter);

        var children = (0, _util.mapNonEmpty)(this.props.children, function (child, index) {
          return _this._buildChild(child, index, _this.gutterSizes);
        });

        return _react2['default'].createElement(
          'div',
          _extends({ ref: 'wrapper', 'data-display-name': 'VLayoutWrapper'
          }, this.props, {
            style: _lodash2['default'].extend(this._getLayoutWrapperStyles(), this.props.style)
          }),
          _react2['default'].createElement(
            'div',
            { ref: 'container', 'data-display-name': 'VLayout',
              style: this._getLayoutStyles()
            },
            children
          )
        );
      }
    }, {
      key: '_buildChild',
      value: function _buildChild(child, index, gutterSizes) {
        var props = (0, _util.makeVLayoutItemChildProps)(this.props, child.props, index, gutterSizes, gutterMultiplier);

        var ref = 'item_' + index;
        this.itemsRefs.push(ref);
        props.ref = ref;

        if (child.type && child.type._isLayoutChild) {
          return _react2['default'].cloneElement(child, props);
        } else {
          return _react2['default'].createElement(
            _vertical_item_ie92['default'],
            props,
            child
          );
        }
      }
    }, {
      key: '_unsetLayoutStyles',
      value: function _unsetLayoutStyles() {
        var _this2 = this;

        var style = this.node.style;

        if (!(0, _util.didDefineHeight)(this.props)) {
          style.height = '';
        }

        if (!(0, _util.didDefineWidth)(this.props)) {
          style.width = '';
        }

        _lodash2['default'].range((0, _util.countNonEmpty)(this.props.children)).forEach(function (i) {
          _this2.refs['item_' + i]._unsetLayoutStyles();
        }, this);
      }
    }, {
      key: '_measureInheritedStyles',
      value: function _measureInheritedStyles() {
        var computedStyle = window.getComputedStyle(this.node);
        this._inheritedTextAlign = computedStyle.textAlign;
      }
    }, {
      key: '_measureWidths',
      value: function _measureWidths() {}
    }, {
      key: '_applyInheritedStyles',
      value: function _applyInheritedStyles() {
        var _this3 = this;

        var items = this.itemsRefs.map(function (ref) {
          return _this3.refs[ref];
        });
        _lodash2['default'].invoke(items, '_applyInheritedStyles', this._inheritedTextAlign);
      }
    }, {
      key: '_applyWidths',
      value: function _applyWidths() {
        if (!(0, _util.didDefineWidth)(this.props)) {
          // our element is display:table, so add width:100% to make it behave like a block element
          this.node.style.width = '100%';
        }
      }
    }, {
      key: '_measureItemHeights',
      value: function _measureItemHeights() {
        var _this4 = this;

        var items = this.itemsRefs.map(function (ref) {
          return _this4.refs[ref];
        });

        this._measuredHeights = items.map(function (item) {
          if ((0, _util.didDefineHeight)(item.props) || item.props.flexGrow) {
            return null;
          }
          return item._measureHeight();
        });
      }
    }, {
      key: '_applyFlexHeights',
      value: function _applyFlexHeights() {
        var _this5 = this;

        var items = this.itemsRefs.map(function (ref) {
          return _this5.refs[ref];
        });

        var totalFlexGrow = (0, _lodash2['default'])(items).filter(function (item) {
          return item.props.flexGrow;
        }).map(function (item) {
          return item.props.flexGrow === true ? 1 : item.props.flexGrow;
        }).sum();

        // sum heights used up by elements
        var usedSpace = (0, _util.sumSizes)('height', items);

        // add computed heights
        var measuredHeightsAsNumbers = this._measuredHeights.filter(function (i) {
          return i !== null;
        }).map(function (measurement) {
          return parseFloat(measurement.slice(0, -2));
        });
        (0, _util.addTo)(usedSpace, 'px', _lodash2['default'].sum(measuredHeightsAsNumbers));

        // add gutters
        (0, _util.addTo)(usedSpace, this.props.gutterUnit, _lodash2['default'].sum(this.gutterSizes));

        _lodash2['default'].range((0, _util.countNonEmpty)(this.props.children)).forEach(function (i) {
          var item = _this5.refs['item_' + i];
          if (item.props.flexGrow) {
            return item._applyHeight((0, _util.getSizeCalc)(usedSpace, item.props.flexGrow, totalFlexGrow));
          }
        });
      }
    }, {
      key: '_callDidLayout',
      value: function _callDidLayout() {
        this.props.onLayout && this.props.onLayout();
      }
    }, {
      key: '_getLayoutWrapperStyles',
      value: function _getLayoutWrapperStyles() {
        var styles = {
          width: this.props.width,
          height: this.props.height
        };

        if (this._isFlexboxLayout()) {
          styles.display = 'block';
        } else {
          // NOTE: use !important override appLayoutGrowChildStatic className, which uses display: block !important
          // to override children who use display: inline-block
          styles.display = 'table !important';
          styles.tableLayout = 'fixed';
        }

        return styles;
      }
    }, {
      key: '_getLayoutStyles',
      value: function _getLayoutStyles() {
        var styles = {
          display: this._isFlexboxLayout() ? 'block' : 'table-cell',
          height: '100%',
          verticalAlign: this.props.alignItems
        };

        return styles;
      }
    }, {
      key: '_isFlexboxLayout',

      // Whenever one of the children has a flexGrow the whole layout
      // becomes 'flex'
      value: function _isFlexboxLayout() {
        var hasFlexGrowChild = false;
        (0, _util.forEachNonEmpty)(this.props.children, function (child) {
          if (child.props.flexGrow) {
            hasFlexGrowChild = true;
          }
        });

        return hasFlexGrowChild;
      }
    }]);

    return VLayoutIE9;
  })(_react2['default'].Component);

  VLayoutIE9.propTypes = _prop_types.VLayoutPropTypes;
  VLayoutIE9.defaultProps = _lodash2['default'].extend({}, _prop_types.VLayoutDefaultPropTypes, {
    gutter: defaultGutter,
    gutterUnit: defaultGutterUnit
  });

  return VLayoutIE9;
};

module.exports = exports['default'];