/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { helmetObserver } from '../../helpers/fetchData';

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

  observer: Object;

  render() {
    return (<Helmet {...this.state.helmet} />);
  }
}

export default HelmetComponent;
