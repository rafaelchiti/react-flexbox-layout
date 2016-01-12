import makeHLayout from './horizontal';
import HLayoutItem from './horizontal_item';
import makeVLayout from './vertical';
import VLayoutItem from './vertical_item';

function createCustomClasses({
  defaultGutter = 0,
  gutterMultiplier = 1,
  defaultGutterUnit = 'px'
} = {}) {

  return {
    HLayout: makeHLayout(defaultGutter, gutterMultiplier, defaultGutterUnit),
    HLayoutItem,
    VLayout: makeVLayout(defaultGutter, gutterMultiplier, defaultGutterUnit),
    VLayoutItem
  };

}

let toExport = createCustomClasses();
toExport.createCustomClasses = createCustomClasses;

toExport.EXPAND_CHILD = 'reactFlexboxLayoutExpandChild';


// TODO: move into util
function addStyleString(str) {
  var node = document.createElement('style');
  node.innerHTML = str;
  document.head.appendChild(node);
}

const flexGrowParentRules = '{ display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; }';
const flexGrowChildRules = '{ -webkit-box-flex: 1 0 auto; -webkit-flex: 1 0 auto; -ms-flex: 1 0 auto; flex: 1 0 auto; position: relative;}';

const staticGrowChildRules = '{ display: block !important; width: 100%; height: 100%; }';

document.addEventListener("DOMContentLoaded", function() {
  addStyleString(`
.appLayoutGrowChildFlex ${flexGrowParentRules}
.appLayoutGrowChildFlex > * ${flexGrowChildRules}

.appLayoutGrowChildFlex > .${toExport.EXPAND_CHILD} ${flexGrowParentRules}
.appLayoutGrowChildFlex > .${toExport.EXPAND_CHILD} > * ${flexGrowChildRules}

.appLayoutGrowChildFlex > .${toExport.EXPAND_CHILD} > .${toExport.EXPAND_CHILD} ${flexGrowParentRules}
.appLayoutGrowChildFlex > .${toExport.EXPAND_CHILD} > .${toExport.EXPAND_CHILD} > * ${flexGrowChildRules}


.appLayoutGrowChildStatic > * ${staticGrowChildRules}

.appLayoutGrowChildStatic > .${toExport.EXPAND_CHILD} > * ${staticGrowChildRules}

.appLayoutGrowChildStatic > .${toExport.EXPAND_CHILD} > .${toExport.EXPAND_CHILD} > * ${staticGrowChildRules}
  `);
});


export default toExport;
