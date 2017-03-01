// @flow
import React from 'react';
import { Router } from 'react-router';
import Helmet from 'client/components/helmet';

export default (props: Object) => {
  if (process.env.NODE_ENV === 'development') {
    const { AppContainer } = require('react-hot-loader');

    return (
      <AppContainer>
        <div>
          <Helmet />
          <Router {...props} />
        </div>
      </AppContainer>
    );
  }

  return (
    <div>
      <Helmet />
      <Router {...props} />
    </div>
  );
};
