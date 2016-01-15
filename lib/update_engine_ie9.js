'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.register = register;
exports.deregister = deregister;
exports.update = update;
exports.requestNextLayoutMinDelay = requestNextLayoutMinDelay;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * UpdateEngineIE9
 *
 * Singleton that handles updating *LayoutIE9 components outside of the React's update flow
 */

// array of mounted *LayoutiE9 components
// invariant: parent Layout components will have lower index than child Layout components
var components = [];

/**
 * register registers a Layout component with the UpdateEngine
 * @param  {LayoutComponent} component
 */

function register(component) {
  if (!_lodash2['default'].contains(components, component)) {
    components.push(component);
  }
}

/**
 * deregister removes a Layout component from the UpdateEngine
 * @param  {LayoutComponent} component
 */

function deregister(component) {
  var i = components.indexOf(component);
  if (i !== -1) {
    components.splice(i, 1);
  }
}

/**
 * update synchronously updates all registered Layout components
 */

function update() {
  // first unset all styles, since existing styles will mess with measurements
  _lodash2['default'].invoke(components, '_unsetLayoutStyles');

  // NOTE: batch measurements and style application as much as possible to prevent excessive reflows

  // apply widths first because heights are dependent on widths (e.g., text wrap), but not the other way around
  _lodash2['default'].invoke(components, '_measureInheritedStyles');
  _lodash2['default'].invoke(components, '_measureWidths');

  _lodash2['default'].invoke(components, '_applyInheritedStyles');
  _lodash2['default'].invoke(components, '_applyWidths');

  // apply heights now that widths have been set
  _lodash2['default'].invoke(components, '_measureItemHeights');
  _lodash2['default'].invoke(components, '_applyFlexHeights');

  // NOTE: each container must be set sequentially instead of batched because child Layout heights can depend on
  // parent Layout heights (e.g., child is vertical flexGrow on parent). In-order traversal of array works because of the
  // invariant described above: parent Layout components will have lower index than child Layout components.
  _lodash2['default'].invoke(components, '_setContainerHeights');

  _lodash2['default'].invoke(components, '_callDidLayout');
}

/**
 * requestAsyncUpdate guarantees that `update` will be run sometime in the future
 */
var requestAsyncUpdate = _lodash2['default'].debounce(updateAfterDelay, 0);

exports.requestAsyncUpdate = requestAsyncUpdate;
// update on window resize
window.addEventListener('resize', _lodash2['default'].debounce(requestAsyncUpdate, 16));

var nextDelay = 0;
/**
 * Request that the next re-layout be at least @delay ms from now.
 * @param  {Number} delay
 */

function requestNextLayoutMinDelay(delay) {
  nextDelay = Math.max(nextDelay, delay);
}

var delayedUpdate, delayedUpdateTime;
function updateAfterDelay() {
  if (nextDelay === 0 && !delayedUpdate) {
    update();
    return;
  }

  var potentialUpdateTime = Date.now() + nextDelay;

  if (!delayedUpdate || potentialUpdateTime > delayedUpdateTime) {
    clearTimeout(delayedUpdate);
    delayedUpdateTime = potentialUpdateTime;
    delayedUpdate = setTimeout(performDelayedUpdate, nextDelay);
  }

  nextDelay = 0;
}

function performDelayedUpdate() {
  delayedUpdate = null;
  update();
}