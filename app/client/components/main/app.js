import React from 'react';
import { Provider } from 'react-redux';
import Debug from './debug';

const App = ({ store, routes }) => (
  <Provider key='provider' store={ store }>
    <div>
      { routes }
      <Debug />
    </div>
  </Provider>
);

App.propTypes = {
  store: React.PropTypes.object,
  routes: React.PropTypes.object,
};

export default App;
