// @flow
import React from 'react';
import Relay from 'react-relay';
import CompleteTodoMutation from 'client/mutations/complete-todo';
import RemoveTodoMutation from 'client/mutations/remove-todo';
import type { ViewerType } from './../types';
import style from './style.css';

const TodosBody = ({ viewer }: { viewer: ViewerType }) => (
  <div className={`col-md-12 ${style.container}`}>
    <table className="table">
      <tbody>
        {
          viewer.todos.edges.map((edge, index) => {
            const todo = edge.node;
            const text = todo.complete ? <s>{todo.text}</s> : <span>{todo.text}</span>;
            const completeTodo = () => Relay.Store.commitUpdate(
              new CompleteTodoMutation({ viewer, todo })
            );
            const removeTodo = () => Relay.Store.commitUpdate(
              new RemoveTodoMutation({ viewer, todo })
            );

            return (
              <tr key={todo.id}>
                <td><span>{index + 1}</span></td>
                <td>{text}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-xs btn-success"
                    onClick={completeTodo}
                  >
                    <i className="fa fa-check" />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-xs btn-danger"
                    onClick={removeTodo}
                  >
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>
);

TodosBody.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};


export default TodosBody;
