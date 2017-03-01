// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { helmetObserver } from 'client/helpers/redial-enhancer';

class HelmetComponent extends React.Component {
  state: { helmet: Object } = {
    helmet: {},
  };

  componentWillMount() {
    this.observer = helmetObserver.subscribe(
      helmet => {
        this.setState({ helmet });
      }
    );
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  props: {
    observer: Object,
  };

  render() {
    return (<Helmet {...this.state.helmet} />);
  }
}

export default HelmetComponent;
