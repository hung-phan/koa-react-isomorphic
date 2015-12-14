import React from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchDataEnhancer from './../helpers/fetch-data-enhancer';
import TodosAdd from './../todos/todos-add';
import TodosHeader from './../todos/todos-header';
import TodosBody from './../todos/todos-body';
import { addTodo, removeTodo, completeTodo, fetchTodos } from 'app/client/actions/todos';

class Todos extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <TodosHeader />
          <TodosAdd addTodo={this.props.actions.addTodo} />
          <TodosBody todos={this.props.todos}
            removeTodo={this.props.actions.removeTodo}
            completeTodo={this.props.actions.completeTodo} />
        </div>
      </div>
    );
  }
}

export default compose(
  fetchDataEnhancer(
    store => store.dispatch(fetchTodos())
  ),
  connect(
    ({ todos, router }) => ({
      todos, router
    }),
    dispatch => ({
      actions: bindActionCreators({
        addTodo,
        removeTodo,
        completeTodo,
        fetchTodos
      }, dispatch)
    })
  )
)(Todos);
