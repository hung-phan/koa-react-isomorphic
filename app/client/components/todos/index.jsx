// @flow
import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchDataEnhancer from 'client/helpers/fetch-data-enhancer.jsx';
import TodosHeader from './todos-header/index.jsx';
import TodosAdd from './todos-add/index.jsx';
import TodosBody from './todos-body/index.jsx';
import TodosFooter from './todos-footer/index.jsx';
import { addTodo, removeTodo, completeTodo, fetchTodos } from './logic-bundle';
import type { TodoType } from './types';

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
  fetchDataEnhancer(
    ({ store }) => store.dispatch(fetchTodos())
  ),
  connect(
    ({ todos }) => ({
      todos,
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
