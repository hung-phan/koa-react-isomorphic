import style from './style.css';
import React from 'react';
import Relay from 'react-relay';
import CompleteTodoMutation from 'client/mutations/complete-todo';
import RemoveTodoMutation from 'client/mutations/remove-todo';

const TodosBody = ({ viewer }) =>
  <div className={`col-md-12 ${style.container}`}>
    <table className='table'>
      <tbody>
        {
          viewer.todos.edges.map((edge, index) => {
            const todo = edge.node;
            const text = todo.complete ? <s>{todo.text}</s> : <span>{todo.text}</span>;
            const _completeTodo = () => Relay.Store.commitUpdate(
              new CompleteTodoMutation({ viewer, todo })
            );
            const _removeTodo = () => Relay.Store.commitUpdate(
              new RemoveTodoMutation({ viewer, todo })
            );

            return (
              <tr key={todo.id}>
                <td><span>{index + 1}</span></td>
                <td>{text}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-xs btn-success'
                    onClick={_completeTodo}
                  >
                    <i className='fa fa-check'></i>
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-xs btn-danger'
                    onClick={_removeTodo}
                  >
                    <i className='fa fa-remove'></i>
                  </button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>;

TodosBody.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};


export default TodosBody;
