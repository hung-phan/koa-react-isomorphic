import { combineReducers } from 'redux-immutablejs';
import routing from './routing';
import reduxAsyncConnect from './redux-async-connect';

import todos from './todos';

export default combineReducers({
  todos,
  routing,
  reduxAsyncConnect,
});
