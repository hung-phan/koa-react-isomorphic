import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './../reducers';

const history = process.env.RUNTIME_ENV === 'client'
                  ? require('react-router').browserHistory
                  : require('history/lib/createMemoryHistory')();
const reduxRouterMiddleware = syncHistory(history);

let middlewares = [
  thunkMiddleware,
  reduxRouterMiddleware,
];
let enhancers = [];

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const logger = require('redux-logger')({ level: 'info' });
  const { persistState } = require('redux-devtools');

  middlewares = [...middlewares, logger];
  enhancers = [
    require('./../components/main/debug').default.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  ];
}

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)(createStore);

export default function configureStore(initialState = {}) {
  const store = finalCreateStore(reducers, initialState);

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
