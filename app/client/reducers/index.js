import { combineReducers } from 'redux-immutablejs';
import { routeReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import todos from './todos';

export default combineReducers({
  todos,
  routing,
  reduxAsyncConnect,
});
