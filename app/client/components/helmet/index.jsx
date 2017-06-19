/* @flow */
import React from "react";
import ReactHelmet from "react-helmet";
import { helmetObserver } from "../../helpers/fetchData";

export default class Helmet extends React.Component {
  state: { helmet: Object } = {
    helmet: {}
  };

  componentWillMount() {
    this.observer = helmetObserver.subscribe(helmet => this.setState({ helmet }));
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  observer: Object;

  render() {
    return <ReactHelmet {...this.state.helmet} />;
  }
}
