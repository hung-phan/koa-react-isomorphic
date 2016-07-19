// @flow
import React from 'react';
import { List } from 'immutable';
import type { CompleteTodoAction, RemoveTodoAction } from './../logic-bundle';
import type { Todo } from './../types';
import style from './style.css';

const TodosBody = ({ todos, completeTodo, removeTodo }: {
  todos: List<Todo>, completeTodo: CompleteTodoAction, removeTodo: RemoveTodoAction
}) => (
  <div className={`col-md-12 ${style.container}`}>
    <table className="table">
      <tbody>
        {
          todos.toJS().map((todo: Todo, index: number) => {
            const text = todo.complete ? <s>{todo.text}</s> : <span>{todo.text}</span>;
            const _completeTodo = () => completeTodo(index);
            const _removeTodo = () => removeTodo(index);

            return (
              <tr key={index}>
                <td><span>{index + 1}</span></td>
                <td>{text}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-xs btn-success"
                    onClick={_completeTodo}
                  >
                    <i className="fa fa-check"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-xs btn-danger"
                    onClick={_removeTodo}
                  >
                    <i className="fa fa-remove"></i>
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
  todos: React.PropTypes.instanceOf(List).isRequired,
  removeTodo: React.PropTypes.func.isRequired,
  completeTodo: React.PropTypes.func.isRequired,
};

export default TodosBody;
