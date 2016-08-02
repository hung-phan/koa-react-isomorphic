import React from 'react';

class ProviderMock extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
  };

  static childContextTypes = {
    store: React.PropTypes.object.isRequired,
  };

  getChildContext() {
    return { store: this.props.store };
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}

export default ProviderMock;
