import React from 'react';
import { List } from 'immutable';

class TodosBody extends React.Component {
  static propsType = {
    todos: React.PropTypes.instanceOf(List),
    removeTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired
  }

  render() {
    const todos = renderTodos(
      this.props.todos,
      this.props.removeTodo,
      this.props.completeTodo
    );

    return (
      <div className='col-md-12'>
        <table className='table'>
          <tbody>
            {todos}
          </tbody>
        </table>
      </div>
    );
  }
}

function renderTodos(todos: List, removeTodo: Function, completeTodo: Function) {
  return todos.toJS().map((todo: Object, index) => {
    const text = todo.complete ? <s>{todo.text}</s> : <span>{todo.text}</span>;

    return (
      <tr key={index}>
        <td><span>{index + 1}</span></td>
        <td>{text}</td>
        <td>
          <button type='button' className='btn btn-xs btn-success' onClick={completeTodo.bind(null, index)}>
            <i className='fa fa-check'></i>
          </button>
        </td>
        <td>
          <button type='button' className='btn btn-xs btn-danger' onClick={removeTodo.bind(null, index)}>
            <i className='fa fa-remove'></i>
          </button>
        </td>
      </tr>
    );
  });
}

export default TodosBody;
