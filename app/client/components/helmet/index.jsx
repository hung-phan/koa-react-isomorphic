/* @flow */
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import ReactHelmet from "react-helmet";
import { selectors } from "./logicBundle";

export const Helmet = ({ helmet }: { helmet: Object }) =>
  <ReactHelmet {...helmet} />;

export default compose(
  connect(state => ({
    helmet: selectors.getHelmet(state)
  }))
)(Helmet);
