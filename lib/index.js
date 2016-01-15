// Disable until we learn how to do properly server side rendering support.
// import hasFlexbox from './modernizr';

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _horizontal = require('./horizontal');

var _horizontal2 = _interopRequireDefault(_horizontal);

var _horizontal_item = require('./horizontal_item');

var _horizontal_item2 = _interopRequireDefault(_horizontal_item);

var _vertical = require('./vertical');

var _vertical2 = _interopRequireDefault(_vertical);

var _vertical_item = require('./vertical_item');

var _vertical_item2 = _interopRequireDefault(_vertical_item);

// import makeHLayoutIE9 from './horizontal_ie9';
// import HLayoutItemIE9 from './horizontal_item_ie9';
// import makeVLayoutIE9 from './vertical_ie9';
// import VLayoutItemIE9 from './vertical_item_ie9';
//
// import {requestNextLayoutMinDelay} from './update_engine_ie9';

var makeHLayout = undefined,
    HLayoutItem = undefined,
    makeVLayout = undefined,
    VLayoutItem = undefined;

// don't use compatibility mode if we're in tests, since it'll slow tests down
// with unnecessary DOM calculations
var env = process.env.NODE_ENV;
var isTesting = env === 'test' || env === 'testing';

// if (!hasFlexbox() && !isTesting) {
//   makeHLayout = makeHLayoutIE9;
//   HLayoutItem = HLayoutItemIE9;
//   makeVLayout = makeVLayoutIE9;
//   VLayoutItem = VLayoutItemIE9;
// } else {
makeHLayout = _horizontal2['default'];
HLayoutItem = _horizontal_item2['default'];
makeVLayout = _vertical2['default'];
VLayoutItem = _vertical_item2['default'];
// }

function createCustomClasses() {
  var _ref = arguments[0] === undefined ? {} : arguments[0];

  var _ref$defaultGutter = _ref.defaultGutter;
  var defaultGutter = _ref$defaultGutter === undefined ? 0 : _ref$defaultGutter;
  var _ref$gutterMultiplier = _ref.gutterMultiplier;
  var gutterMultiplier = _ref$gutterMultiplier === undefined ? 1 : _ref$gutterMultiplier;
  var _ref$defaultGutterUnit = _ref.defaultGutterUnit;
  var defaultGutterUnit = _ref$defaultGutterUnit === undefined ? 'px' : _ref$defaultGutterUnit;

  return {
    HLayout: makeHLayout(defaultGutter, gutterMultiplier, defaultGutterUnit),
    HLayoutItem: HLayoutItem,
    VLayout: makeVLayout(defaultGutter, gutterMultiplier, defaultGutterUnit),
    VLayoutItem: VLayoutItem
  };
}

var toExport = createCustomClasses();
toExport.createCustomClasses = createCustomClasses;

toExport.EXPAND_CHILD = 'reactFlexboxLayoutExpandChild';

// toExport.requestNextLayoutMinDelay = requestNextLayoutMinDelay;

exports['default'] = toExport;

// TODO: move into util
function addStyleString(str) {
  if (typeof document === 'undefined') return;

  var node = document.createElement('style');
  node.innerHTML = str;
  document.head.appendChild(node);
}

var flexGrowParentRules = '{ display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; }';
var flexGrowChildRules = '{ -webkit-box-flex: 1 0 auto; -webkit-flex: 1 0 auto; -ms-flex: 1 0 auto; flex: 1 0 auto; position: relative;}';

var staticGrowChildRules = '{ display: block !important; width: 100%; height: 100%; }';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    addStyleString('\n      .appLayoutGrowChildFlex ' + flexGrowParentRules + '\n      .appLayoutGrowChildFlex > * ' + flexGrowChildRules + '\n\n      .appLayoutGrowChildFlex > .' + toExport.EXPAND_CHILD + ' ' + flexGrowParentRules + '\n      .appLayoutGrowChildFlex > .' + toExport.EXPAND_CHILD + ' > * ' + flexGrowChildRules + '\n\n      .appLayoutGrowChildFlex > .' + toExport.EXPAND_CHILD + ' > .' + toExport.EXPAND_CHILD + ' ' + flexGrowParentRules + '\n      .appLayoutGrowChildFlex > .' + toExport.EXPAND_CHILD + ' > .' + toExport.EXPAND_CHILD + ' > * ' + flexGrowChildRules + '\n\n\n      .appLayoutGrowChildStatic > * ' + staticGrowChildRules + '\n\n      .appLayoutGrowChildStatic > .' + toExport.EXPAND_CHILD + ' > * ' + staticGrowChildRules + '\n\n      .appLayoutGrowChildStatic > .' + toExport.EXPAND_CHILD + ' > .' + toExport.EXPAND_CHILD + ' > * ' + staticGrowChildRules + '\n\n      .appLayoutVendoredFlex {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n      }\n      ');
  });
}
module.exports = exports['default'];