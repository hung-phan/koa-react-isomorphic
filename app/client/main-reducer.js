import { combineReducers } from 'redux-immutablejs';
import routing from './components/routing/logic-bundle';
import todos from './components/todos/logic-bundle';

export default combineReducers({
  todos,
  routing,
});
