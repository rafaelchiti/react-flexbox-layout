"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapNonEmpty = mapNonEmpty;
exports.forEachNonEmpty = forEachNonEmpty;
exports.countNonEmpty = countNonEmpty;
exports.getVGutterSizes = getVGutterSizes;
exports.getHGutterSizes = getHGutterSizes;
exports.sumSizes = sumSizes;
exports.addTo = addTo;
exports.getSizeCalc = getSizeCalc;
exports.normalizeAlign = normalizeAlign;
exports.normalizeJustify = normalizeJustify;
exports.makeVLayoutItemChildProps = makeVLayoutItemChildProps;
exports.makeHLayoutItemChildProps = makeHLayoutItemChildProps;
exports.didDefineWidth = didDefineWidth;
exports.didDefineHeight = didDefineHeight;
exports.pxToUnit = pxToUnit;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function mapNonEmpty(children, fn) {
  var offset = 0;
  return _react2["default"].Children.map(children, function (child, index) {
    if (!child) {
      offset += 1;
      return child;
    }

    return fn(child, index - offset);
  });
}

function forEachNonEmpty(children, fn) {
  var offset = 0;
  _react2["default"].Children.forEach(children, function (child, index) {
    if (!child) {
      offset += 1;
      return;
    }

    fn(child, index - offset);
  });
}

function countNonEmpty(children) {
  var count = 0;
  _react2["default"].Children.forEach(children, function (child) {
    if (child) {
      count += 1;
    }
  });

  return count;
}

function getVGutterSizes(children, defaultGutter) {
  return getGutterSizes("gutterTop", "gutterBottom", children, defaultGutter);
}

function getHGutterSizes(children, defaultGutter) {
  return getGutterSizes("gutterLeft", "gutterRight", children, defaultGutter);
}

function getGutterSizes(gutterPrevKey, gutterNextKey, children, defaultGutter) {
  var childrenCount = countNonEmpty(children);
  var gutterSizes = new Array(childrenCount);

  // fill in gutters specified on children
  forEachNonEmpty(children, function (child, index) {
    var gutterPrev = child.props && child.props[gutterPrevKey],
        gutterNext = child.props && child.props[gutterNextKey];

    if (index === 0) {
      gutterSizes[0] = gutterPrev;
    } else {
      if (_lodash2["default"].isNumber(gutterSizes[index])) {
        if (_lodash2["default"].isNumber(gutterPrev)) {
          gutterSizes[index] = Math.max(gutterSizes[index], gutterPrev);
        }
      } else {
        gutterSizes[index] = gutterPrev;
      }
    }

    gutterSizes[index + 1] = gutterNext;
  });

  // fill in blank gutters with the default
  gutterSizes = gutterSizes.map(function (gutter, index) {
    return _lodash2["default"].isNumber(gutter) ? gutter : index === 0 || index === childrenCount ? 0 : defaultGutter;
  });

  return gutterSizes;
}

var sizeRegex = /^\s*(\d+)([^\s]+)\s*$/;

function sumSizes(dimension, items) {
  var sum = {};

  items.forEach(function (item) {
    var size = item.props[dimension] || item.props.style && item.props.style[dimension];
    if (size === undefined || size === null) {
      return;
    }
    if (_lodash2["default"].isNumber(size)) {
      addTo(sum, "px", size);
    } else {
      var matches = sizeRegex.exec(size);
      if (matches) {
        var _matches = _slicedToArray(matches, 3);

        var value = _matches[1];
        var unit = _matches[2];

        addTo(sum, unit, parseFloat(value));
      }
    }
  });

  return sum;
}

function addTo(map, key, value) {
  if (!map[key]) {
    map[key] = value;
  } else {
    map[key] += value;
  }
}

function getSizeCalc(usedSpace, flexGrow, totalFlexGrow) {
  var ratio = flexGrow / totalFlexGrow;
  var expressions = [100 * ratio + "%"];

  _lodash2["default"].each(usedSpace, function (value, unit) {
    expressions.push("" + value * ratio + unit);
  });

  return "calc(" + expressions.join(" - ") + ")";
}

function normalizeAlign(align) {
  var normalized = undefined;
  switch (align) {
    case "top":
      normalized = "flex-start";
      break;
    case "middle":
      normalized = "center";
      break;
    case "bottom":
      normalized = "flex-end";
      break;
    default:
      normalized = align;
      break;
  }

  return normalized;
}

function normalizeJustify(justify) {
  switch (justify) {
    case "left":
      return "flex-start";
    case "center":
      return "center";
    case "right":
      return "flex-end";
  }
}

function makeVLayoutItemChildProps(parentProps, childProps, index, gutterSizes, gutterMultiplier) {
  if (childProps === undefined) childProps = {};

  var props = {};

  if (index === 0) {
    props._gutterTop = gutterSizes[0] ? gutterSizes[0] * gutterMultiplier + parentProps.gutterUnit : undefined;
  }
  props._gutterBottom = gutterSizes[index + 1] ? gutterSizes[index + 1] * gutterMultiplier + parentProps.gutterUnit : undefined;
  props.justify = childProps.justify || parentProps.justifyItems;

  return props;
}

function makeHLayoutItemChildProps(parentProps, childProps, index, gutterSizes, gutterMultiplier) {
  if (childProps === undefined) childProps = {};

  var props = {};

  if (index === 0) {
    props._gutterLeft = gutterSizes[0] ? gutterSizes[0] * gutterMultiplier + parentProps.gutterUnit : undefined;
  }
  props._gutterRight = gutterSizes[index + 1] ? gutterSizes[index + 1] * gutterMultiplier + parentProps.gutterUnit : undefined;
  props.align = childProps.align || parentProps.alignItems;

  return props;
}

function didDefineWidth(props) {
  return props.width != null || (props.style && props.style.width) != null;
}

function didDefineHeight(props) {
  return props.height != null || (props.style && props.style.height) != null;
}

function pxToUnit(dimensionString) {
  if (!dimensionString) {
    return 0;
  }
  return parseInt(dimensionString.slice(0, -2), 10);
}