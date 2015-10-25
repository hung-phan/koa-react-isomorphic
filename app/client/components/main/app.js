import React from 'react';
import { Provider } from 'react-redux';
import debug from './debug';

export default ({ store, routes }) => {
  return (
    <div>
      <Provider key='provider' store={store}>
        {routes}
      </Provider>
      {debug(store)}
    </div>
  );
};
