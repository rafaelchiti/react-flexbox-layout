import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { HLayout, HLayoutItem, VLayout } from 'react-flexbox-layout';

class DummyNode extends React.Component {
  render() {
    let style = {background: '#aaa'};
    _.extend(style, this.props.style);

    return (
      <div {...this.props} style={style} />
    );
  }
}

ReactDOM.render((
  <HLayout gutter={10}>
    <div>
      <VLayout gutter={10}>
        <span>top</span>
        <span>bottom</span>
      </VLayout>
    </div>
    <HLayoutItem flexGrow align="top">
      <DummyNode style={{padding: 10}}>top</DummyNode>
    </HLayoutItem>
  </HLayout>
), document.getElementById("example"));
