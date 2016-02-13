import { combineReducers } from 'redux-immutablejs';
import routing from './routing';
import todos from './todos';

export default combineReducers({
  todos,
  routing,
});
