import autobind from 'autobind-decorator';
import style from './style.css';
import React from 'react';
import { List } from 'immutable';

class TodosBody extends React.Component {
  static propTypes = {
    todos: React.PropTypes.instanceOf(List).isRequired,
    removeTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired,
  };

  @autobind
  _completeTodo(index) {
    return () => {
      this.props.completeTodo(index);
    };
  }

  @autobind
  _removeTodo(index) {
    return () => {
      this.props.removeTodo(index);
    };
  }

  _renderTodos() {
    return this.props.todos.toJS().map((todo, index) => {
      const text = todo.complete ? <s>{todo.text}</s> : <span>{todo.text}</span>;

      return (
        <tr key={index}>
          <td><span>{index + 1}</span></td>
          <td>{text}</td>
          <td>
            <button type='button' className='btn btn-xs btn-success'
              onClick={this._completeTodo(index)}
            >
              <i className='fa fa-check'></i>
            </button>
          </td>
          <td>
            <button type='button' className='btn btn-xs btn-danger'
              onClick={this._removeTodo(index)}
            >
              <i className='fa fa-remove'></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className={`col-md-12 ${style.container}`}>
        <table className='table'>
          <tbody>
            {this._renderTodos()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TodosBody;
