import React from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodosAdd from './todos-add';
import TodosHeader from './todos-header';
import TodosBody from './todos-body';
import fetchDataEnhancer from 'client/helpers/fetch-data-enhancer';
import { addTodo, removeTodo, completeTodo, fetchTodos } from './logic-bundle';

/* eslint-disable react/prefer-stateless-function */
export class Todos extends React.Component {
  static propTypes = {
    todos: React.PropTypes.array,
    actions: React.PropTypes.object,
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <TodosHeader />
          <TodosAdd addTodo={ this.props.actions.addTodo } />
          <TodosBody todos={ this.props.todos }
            removeTodo={ this.props.actions.removeTodo }
            completeTodo={ this.props.actions.completeTodo }
          />
        </div>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

export const decorators = compose(
  connect(
    ({ todos }) => ({
      todos,
    }),
    dispatch => ({
      actions: bindActionCreators({
        addTodo,
        removeTodo,
        completeTodo,
        fetchTodos,
      }, dispatch),
    })
  ),
  fetchDataEnhancer(
    ({ store }) => store.dispatch(fetchTodos())
  )
);

export default decorators(Todos);
