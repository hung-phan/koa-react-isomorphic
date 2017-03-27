/* @flow */
import { combineReducers } from 'redux';
import todosReducer, { mountPoint as todosMountPoint } from './components/todos/logicBundle';
import routingReducer, { mountPoint as routingMountPoint } from './components/routing/logicBundle';
import helmetReducer, { mountPoint as helmetMountPoint } from './components/helmet/logicBundle';

export default combineReducers({
  [todosMountPoint]: todosReducer,
  [routingMountPoint]: routingReducer,
  [helmetMountPoint]: helmetReducer,
});
