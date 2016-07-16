import React from 'react';
import { Provider } from 'react-redux';

const App = ({ store, routes }) =>
  <Provider key="provider" store={store}>
    <div>
      {routes}
    </div>
  </Provider>;

App.propTypes = {
  store: React.PropTypes.object,
  routes: React.PropTypes.object,
};

export default App;
