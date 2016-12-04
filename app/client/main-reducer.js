import { combineReducers } from 'redux-immutable';
import todosReducer, { mountPoint as todosMountPoint } from './components/todos/logic-bundle';
import routingReducer, { mountPoint as routingMountPoint } from './components/routing/logic-bundle';

export default combineReducers({
  [todosMountPoint]: todosReducer,
  [routingMountPoint]: routingReducer,
});
