import React from 'react';
import { Provider } from 'react-redux';

const App = ({ store, routes }: { store: Object, routes: Object }) => {
  if (process.env.NODE_ENV === 'development') {
    const { AppContainer } = require('react-hot-loader');

    return (
      <AppContainer>
        <Provider key="provider" store={store}>
          {routes}
        </Provider>
      </AppContainer>
    );
  }

  return (
    <Provider key="provider" store={store}>
      {routes}
    </Provider>
  );
};

export default App;
