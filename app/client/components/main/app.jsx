import React from 'react';
import { Provider } from 'react-redux';

const App = ({ store, routes }: { store: Object, routes: Object }) =>
  <Provider key="provider" store={store}>
    {routes}
  </Provider>;

export default App;
