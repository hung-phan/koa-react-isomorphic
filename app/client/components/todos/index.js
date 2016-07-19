// @flow
import React from 'react';
import { List } from 'immutable';
import { compose, shouldUpdate } from 'recompose';
import shallowEqualImmutable from 'react-immutable-render-mixin/lib/shallowEqualImmutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodosHeader from './todos-header';
import TodosAdd from './todos-add';
import TodosBody from './todos-body';
import TodosFooter from './todos-footer';
import fetchDataEnhancer from 'client/helpers/fetch-data-enhancer';
import { addTodo, removeTodo, completeTodo, fetchTodos } from './logic-bundle';
import type { Todo } from './types';

export const Todos = ({ todos, actions }: { todos: List<Todo>, actions: Object }) => (
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

Todos.propTypes = {
  todos: React.PropTypes.instanceOf(List).isRequired,
  actions: React.PropTypes.object,
};

export const enhance = compose(
  fetchDataEnhancer(
    ({ store }) => store.dispatch(fetchTodos())
  ),
  connect(
    state => ({
      todos: state.get('todos'),
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
