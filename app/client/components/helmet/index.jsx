// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { selectors } from './logic-bundle';

export const HelmetComponent = ({ helmet }: { helmet: Object }) => (
  <Helmet
    title={helmet.title}
    link={helmet.link}
  />
);

export const enhance = compose(
  connect(
    state => ({
      helmet: selectors.getHelmet(state),
    })
  )
);

export default enhance(HelmetComponent);
