'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function layoutItemChildrenChecker(props, propName, componentName) {
  if (_react2['default'].Children.count(props[propName]) > 1) {
    return new Error('Can\'t provide more than one child to ' + componentName + '.');
  }
}

function shouldNotExist(props, propName, componentName) {
  if (props.hasOwnProperty(propName)) {
    return new Error('Invalid prop ' + propName + ' supplied to ' + componentName + '.');
  }
}

//
// Horizontal Layout
//
var HLayoutPropTypes = {
  justifyItems: _react2['default'].PropTypes.oneOf(['left', 'center', 'right']),
  alignItems: _react2['default'].PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom', 'stretch']),
  gutter: _react2['default'].PropTypes.number,
  gutterUnit: _react2['default'].PropTypes.string,
  width: _react2['default'].PropTypes.any,
  height: _react2['default'].PropTypes.any,
  style: function style(props, propName, componentName) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = layoutDangerousStyles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var property = _step.value;

        if (props[propName] && props[propName].hasOwnProperty(property)) {
          return new Error(componentName + ' ' + propName + ' can\'t have ' + property + '.');
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  onLayout: _react2['default'].PropTypes.func
};

exports.HLayoutPropTypes = HLayoutPropTypes;
var HLayoutDefaultPropTypes = {
  justifyItems: 'left',
  alignItems: 'top',
  gutter: 0,
  gutterUnit: 'px'
};

exports.HLayoutDefaultPropTypes = HLayoutDefaultPropTypes;
var HLayoutItemPropTypes = {
  width: _react2['default'].PropTypes.any,
  height: _react2['default'].PropTypes.any,
  flexGrow: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.number]),
  align: _react2['default'].PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom', 'stretch']),
  justify: shouldNotExist,

  gutterLeft: _react2['default'].PropTypes.number,
  gutterRight: _react2['default'].PropTypes.number,

  children: layoutItemChildrenChecker,

  // Used internally by HLayout
  _gutterLeft: _react2['default'].PropTypes.string,
  _gutterRight: _react2['default'].PropTypes.string,

  style: function style(props, propName, componentName) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = layoutItemDangerousStyles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var property = _step2.value;

        if (props[propName] && props[propName].hasOwnProperty(property)) {
          return new Error(componentName + ' ' + propName + ' can\'t have ' + property + '.');
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (props.flexGrow && (props[propName] && props[propName].hasOwnProperty('width') || props.hasOwnProperty('width'))) {
      return new Error(componentName + ' can\'t define width when flexGrow is set.');
    }

    if (props.align === 'stretch' && (props[propName] && props[propName].hasOwnProperty('height') || props.hasOwnProperty('height'))) {
      return new Error(componentName + ' can\'t define height when align=stretch.');
    }
  }
};

exports.HLayoutItemPropTypes = HLayoutItemPropTypes;
//
// Vertical Layout
//
var VLayoutPropTypes = {
  justifyItems: _react2['default'].PropTypes.oneOf(['left', 'center', 'right', 'stretch']),
  alignItems: _react2['default'].PropTypes.oneOf(['top', 'middle', 'bottom']),
  gutter: _react2['default'].PropTypes.number,
  gutterUnit: _react2['default'].PropTypes.string,
  width: _react2['default'].PropTypes.any,
  height: _react2['default'].PropTypes.any,
  style: function style(props, propName, componentName) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = layoutDangerousStyles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var property = _step3.value;

        if (props[propName] && props[propName].hasOwnProperty(property)) {
          return new Error(componentName + ' ' + propName + ' can\'t have ' + property + '.');
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  },
  onLayout: _react2['default'].PropTypes.func
};

exports.VLayoutPropTypes = VLayoutPropTypes;
var VLayoutDefaultPropTypes = {
  justifyItems: 'stretch',
  alignItems: 'top',
  gutter: 0,
  gutterUnit: 'px'
};

exports.VLayoutDefaultPropTypes = VLayoutDefaultPropTypes;
var VLayoutItemPropTypes = {
  width: _react2['default'].PropTypes.any,
  height: _react2['default'].PropTypes.any,
  flexGrow: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.number]),
  align: shouldNotExist,
  justify: _react2['default'].PropTypes.oneOf(['left', 'center', 'right', 'stretch']),

  gutterTop: _react2['default'].PropTypes.number,
  gutterBottom: _react2['default'].PropTypes.number,

  children: layoutItemChildrenChecker,

  // Used internally by VLayout
  _gutterTop: _react2['default'].PropTypes.string,
  _gutterBottom: _react2['default'].PropTypes.string,

  style: function style(props, propName, componentName) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = layoutItemDangerousStyles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var property = _step4.value;

        if (props[propName] && props[propName].hasOwnProperty(property)) {
          return new Error(componentName + ' ' + propName + ' can\'t have ' + property);
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    if (props.flexGrow && (props[propName] && props[propName].hasOwnProperty('height') || props.hasOwnProperty('height'))) {
      return new Error(componentName + ' can\'t define height when flexGrow is set');
    }

    if (props.justify === 'stretch' && (props[propName] && props[propName].hasOwnProperty('width') || props.hasOwnProperty('width'))) {
      return new Error(componentName + ' can\'t define width when justify=stretch');
    }
  }
};

exports.VLayoutItemPropTypes = VLayoutItemPropTypes;
var everythingDangerousStyles = ['display', 'position', 'float'];

var layoutDangerousStyles = everythingDangerousStyles;

var layoutItemDangerousStyles = everythingDangerousStyles.concat(['margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight']);