import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './../reducers';

let middlewares = [
  thunkMiddleware,
];
let enhancers = [];

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const logger = require('redux-logger')({
    level: 'info',
    stateTransformer: state => state.toJS(),
  });
  const { persistState } = require('redux-devtools');

  middlewares = [
    ...middlewares,
    logger,
  ];
  enhancers = [
    ...enhancers,
    require('./../components/main/debug').default.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  ];
}

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)(createStore);

export default function configureStore(initialState = {}) {
  const store = finalCreateStore(reducers, fromJS(initialState));

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
