import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import Debug from './debug';

export default ({ store, routes }) => {
  return (
    <Provider key='provider' store={store}>
      <ReduxRouter routes={routes} />
      <Debug />
    </Provider>
  );
};
