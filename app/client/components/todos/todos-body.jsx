// @flow
import React from 'react';
import { List } from 'immutable';
import partial from 'lodash/partial';
import type { TodoType, CompleteTodoActionType, RemoveTodoActionType } from './types';
import style from './todos-body-style.css';

const TodosBody = ({ todos, completeTodo, removeTodo }: {
  todos: List<TodoType>, completeTodo: CompleteTodoActionType, removeTodo: RemoveTodoActionType,
}) => (
  <div className={`col-md-12 ${style.container}`}>
    <table className="table">
      <tbody>
        {
          todos.toJS().map((todo: TodoType, index: number) => {
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
