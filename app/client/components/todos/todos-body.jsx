// @flow
import React from 'react';
import partial from 'lodash/partial';
import style from './todos-body-style.css';
import type { TodoType, CompleteTodoActionType, RemoveTodoActionType } from './types';

const TodosBody = ({ todos, completeTodo, removeTodo }: {
  todos: TodoType[], completeTodo: CompleteTodoActionType, removeTodo: RemoveTodoActionType,
}) => (
  <div className={`col-md-12 ${style.container}`}>
    <table className="table">
      <tbody>
        {
          todos.map((todo: TodoType, index: number) => {
            const text = todo.complete ? <s>{todo.text}</s> : <span>{todo.text}</span>;

            return (
              <tr key={index}>
                <td><span>{index + 1}</span></td>
                <td>{text}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-xs btn-success"
                    onClick={partial(completeTodo, index)}
                  >
                    <i className="fa fa-check" />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-xs btn-danger"
                    onClick={partial(removeTodo, index)}
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

export default TodosBody;
