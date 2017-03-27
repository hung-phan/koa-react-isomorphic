/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { selectors } from './logicBundle';

export const HelmetComponent = ({ helmet }: { helmet: Object }) => (
  <Helmet {...helmet} />
);

export const enhance = compose(
  connect(
    state => ({
      helmet: selectors.getHelmet(state),
    })
  )
);

export default enhance(HelmetComponent);
