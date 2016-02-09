import React from 'react';
import { Provider } from 'react-redux';
import Debug from './debug';

export default ({ store, routes }) => (
  <Provider key='provider' store={ store }>
    <div>
      { routes }
      <Debug />
    </div>
  </Provider>
);
