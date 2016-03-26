import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import todos from './../modules/todos';

export default combineReducers({
  todos,
  routing,
});
