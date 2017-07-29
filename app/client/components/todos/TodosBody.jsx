/* @flow */
import React from "react";
import style from "./TodosBodyStyle.css";
import { commit as removeTodoAction } from "../../mutations/RemoveTodoMutation";
import { commit as completeTodoAction } from "../../mutations/CompleteTodoMutation";
import type { todos_viewer } from "./__generated__/todos_viewer.graphql";

export default function TodosBody({ viewer }: { viewer: todos_viewer }) {
  const getViewerComponent = () => {
    if (!viewer.todos || !viewer.todos.edges) {
      return null;
    }

    return viewer.todos.edges.map((edge, index) => {
      if (!edge || !edge.node) {
        return null;
      }

      const todo = edge.node;
      const text = todo.complete
        ? <s>{todo.text}</s>
        : <span>{todo.text}</span>;

      return (
        <tr key={todo.id}>
          <td>
            <span>
              {index + 1}
            </span>
          </td>
          <td>
            {text}
          </td>
          <td>
            <button
              type="button"
              className="btn btn-xs btn-success"
              onClick={() => completeTodoAction(todo.id)}
            >
              <i className="fa fa-check" />
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-xs btn-danger"
              onClick={() => removeTodoAction(todo.id)}
            >
              <i className="fa fa-remove" />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={`col-md-12 ${style.container}`}>
      <table className="table">
        <tbody>
          {getViewerComponent()}
        </tbody>
      </table>
    </div>
  );
}
