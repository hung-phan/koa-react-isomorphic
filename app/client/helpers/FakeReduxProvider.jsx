/* @flow */
import React from 'react';

export default class ProviderMock extends React.Component {
  static childContextTypes = {
    store: React.PropTypes.object.isRequired,
  };

  getChildContext() {
    return { store: this.props.store };
  }

  props: {
    store: Object,
    children: Object | any[]
  };

  render() {
    return (<div>{this.props.children}</div>);
  }
}
