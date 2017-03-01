// @flow
import React from 'react';
import { Router } from 'react-router';

export default (props: Object) => {
  if (process.env.NODE_ENV === 'development') {
    const { AppContainer } = require('react-hot-loader');

    return (
      <AppContainer>
        <div>
          <Router {...props} />
        </div>
      </AppContainer>
    );
  }

  return (
    <div>
      <Router {...props} />
    </div>
  );
};
