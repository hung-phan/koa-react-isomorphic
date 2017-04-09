/* @flow */
import React from "react";
import type { AddTodoActionType } from "./types";

export default class TodosAdd extends React.PureComponent {
  state: { todo: string } = {
    todo: ""
  };

  props: {
    addTodo: AddTodoActionType
  };

  updateTodo = (e: Object) => {
    this.setState({ todo: e.target.value });
  };

  addTodo = () => {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: "" });
  };

  render() {
    return (
      <div className="col-md-12">
        <div className="form-inline">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Todo"
              value={this.state.todo}
              onChange={this.updateTodo}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.addTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    );
  }
}
