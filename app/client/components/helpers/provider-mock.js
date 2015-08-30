import React from 'react/addons';

class ProviderMock extends React.Component {
  static childContextTypes = {
    store: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return { store: this.props.store };
  }

  render() {
    return this.props.children();
  }
}

export default ProviderMock;
