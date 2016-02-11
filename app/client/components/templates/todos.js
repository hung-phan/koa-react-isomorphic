import React from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchDataEnhancer from './../helpers/fetch-data-enhancer';
import TodosAdd from './../todos/todos-add';
import TodosHeader from './../todos/todos-header';
import TodosBody from './../todos/todos-body';
import { addTodo, removeTodo, completeTodo, fetchTodos } from 'app/client/actions/todos';

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
    (params, store) => store.dispatch(fetchTodos())
  )
);

export default decorators(Todos);
