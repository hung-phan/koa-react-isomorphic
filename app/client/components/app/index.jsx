/* @flow */
/* global process */
import React from 'react';
import { Provider } from 'react-redux';
import Helmet from '../helmet';

export default ({ store, routes }: { store: Object, routes: Object }) => {
  let Component = (
    <Provider key="provider" store={store}>
      <div>
        <Helmet />
        {routes}
      </div>
    </Provider>
  );

  if (process.env.NODE_ENV === 'development') {
    const { AppContainer } = require('react-hot-loader');

    Component = (
      <AppContainer>
        {Component}
      </AppContainer>
    );
  }

  return Component;
};
