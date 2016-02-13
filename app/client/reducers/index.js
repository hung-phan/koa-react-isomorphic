import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';

import todos from './todos';

export default combineReducers({
  todos,
  routing,
});
