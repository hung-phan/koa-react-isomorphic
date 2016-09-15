/* istanbul ignore next */
import { combineReducers } from 'redux-immutable';
import routing from './components/routing/logic-bundle';
import todos from './components/todos/logic-bundle';

export default combineReducers({
  todos,
  routing,
});
