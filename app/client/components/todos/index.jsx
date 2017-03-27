/* @flow */
import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodosHeader from './TodosHeader';
import TodosAdd from './TodosAdd';
import TodosBody from './TodosBody';
import TodosFooter from './TodosFooter';
import type { TodoType } from './types';
import { addTodo, completeTodo, fetchTodos, removeTodo, selectors } from './logicBundle';
import { updateLink } from '../helmet/logicBundle';
import createRedialHooks from '../../helpers/createRedialHooks';
import { FETCH_DATA_HOOK, INJECT_PRELOAD_LINK_HOOK } from '../../helpers/fetchData';

export const Todos = ({ todos, actions }: { todos: TodoType[], actions: Object }) => (
  <div className="container">
    <div className="row">
      <TodosHeader />
      <TodosAdd addTodo={actions.addTodo} />
      <TodosBody
        todos={todos}
        removeTodo={actions.removeTodo}
        completeTodo={actions.completeTodo}
      />
      <TodosFooter />
    </div>
  </div>
);

export const enhance = compose(
  createRedialHooks({
    [FETCH_DATA_HOOK]: ({ store }) => store.dispatch(fetchTodos()),
    [INJECT_PRELOAD_LINK_HOOK]: ({ store }) => store.dispatch(updateLink([
      // window.javascriptAssets will be injected to do preload link for optimizing route
      { rel: 'preload', href: window.javascriptAssets['static-page'], as: 'script' },
    ])),
  }),
  connect(
    state => ({
      todos: selectors.getTodos(state),
    }),
    dispatch => ({
      actions: bindActionCreators({
        addTodo,
        removeTodo,
        completeTodo,
      }, dispatch),
    })
  ),
  onlyUpdateForKeys(['todos'])
);

export default enhance(Todos);
