import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import todos from './components/todos/logic-bundle';

export default combineReducers({
  todos,
  routing,
});
