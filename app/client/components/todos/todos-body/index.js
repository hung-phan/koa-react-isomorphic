import style from './style.css';
import React from 'react';

class TodosBody extends React.Component {
  static propsType = {
    todos: React.PropTypes.array.isRequired,
    removeTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired
  }

  render() {
    const { todos, removeTodo, completeTodo } = this.props;

    return (
      <div className={`col-md-12 ${style.container}`}>
        <table className='table'>
          <tbody>
            {renderTodos(todos, removeTodo, completeTodo)}
          </tbody>
        </table>
      </div>
    );
  }
}

function renderTodos(todos: Array, removeTodo: Function, completeTodo: Function) {
  return todos.map((todo: Object, index) => {
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
