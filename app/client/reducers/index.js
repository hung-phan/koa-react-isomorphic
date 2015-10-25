import { combineReducers } from 'redux-immutablejs';
import { routerStateReducer } from 'redux-router';

import todos from './todos';

export default combineReducers({
  todos,
  router: routerStateReducer
});
