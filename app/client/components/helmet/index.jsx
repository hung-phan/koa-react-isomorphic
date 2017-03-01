// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'recompose';

export const HelmetComponent = ({ helmet }: { helmet: Object }) => (
  <Helmet {...helmet} />
);

export const enhance = compose();

export default enhance(HelmetComponent);
