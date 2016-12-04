// @flow
import React from 'react';
import { List } from 'immutable';
import { compose, shouldUpdate } from 'recompose';
import shallowEqualImmutable from 'react-immutable-render-mixin/lib/shallowEqualImmutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchDataEnhancer from './../../helpers/fetch-data-enhancer';
import TodosHeader from './todos-header';
import TodosAdd from './todos-add';
import TodosBody from './todos-body';
import TodosFooter from './todos-footer';
import { selectors, addTodo, removeTodo, completeTodo, fetchTodos } from './logic-bundle';
import type { TodoType } from './types';

export const Todos = ({ todos, actions }: { todos: List<TodoType>, actions: Object }) => (
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
  shouldUpdate((props, nextProps) => !shallowEqualImmutable(props.todos, nextProps.todos))
);

export default enhance(Todos);
