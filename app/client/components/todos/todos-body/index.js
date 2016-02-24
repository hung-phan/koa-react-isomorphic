import autobind from 'autobind-decorator';
import style from './style.css';
import React from 'react';
import Relay from 'react-relay';
import CompleteTodoMutation from 'app/client/mutations/complete-todo';
import RemoveTodoMutation from 'app/client/mutations/remove-todo';

class TodosBody extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
  };

  @autobind
  _completeTodo(todo) {
    return () => {
      Relay.Store.commitUpdate(new CompleteTodoMutation({ viewer: this.props.viewer, todo }));
    };
  }

  @autobind
  _removeTodo(todo) {
    return () => {
      Relay.Store.commitUpdate(new RemoveTodoMutation({ viewer: this.props.viewer, todo }));
    };
  }

  _renderTodos() {
    return this.props.viewer.todos.edges.map((edge, index) => {
      const todo = edge.node;
      const text = todo.complete ? <s>{todo.text}</s> : <span>{todo.text}</span>;

      return (
        <tr key={todo.id}>
          <td><span>{index + 1}</span></td>
          <td>{text}</td>
          <td>
            <button type='button' className='btn btn-xs btn-success'
              onClick={this._completeTodo(todo)}
            >
              <i className='fa fa-check'></i>
            </button>
          </td>
          <td>
            <button type='button' className='btn btn-xs btn-danger'
              onClick={this._removeTodo(todo)}
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
