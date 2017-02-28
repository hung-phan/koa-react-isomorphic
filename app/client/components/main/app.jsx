import React from 'react';
import { Provider } from 'react-redux';
import Helmet from 'client/components/helmet';

const App = ({ store, routes }: { store: Object, routes: Object }) => {
  if (process.env.NODE_ENV === 'development') {
    const { AppContainer } = require('react-hot-loader');

    return (
      <AppContainer>
        <Provider key="provider" store={store}>
          <div>
            <Helmet />
            {routes}
          </div>
        </Provider>
      </AppContainer>
    );
  }

  return (
    <Provider key="provider" store={store}>
      <div>
        <Helmet />
        {routes}
      </div>
    </Provider>
  );
};

export default App;
