/* @flow */
import React from "react";
import { commit as addTodoAction } from "../../mutations/AddTodoMutation";
import type { todos_viewer } from "./__generated__/todos_viewer.graphql";

export default class TodosAdd extends React.PureComponent {
  state: { todo: string, numberOfTodos: number } = {
    todo: "",
    numberOfTodos: 20
  };

  props: {
    viewer: todos_viewer,
    relay: Object
  };

  updateTodo = (e: SyntheticInputEvent) => {
    this.setState({ todo: e.target.value });
  };

  addTodo = () => {
    addTodoAction(this.state.todo);
    this.setState({ todo: "" });
  };

  changeNumberOfTodoList = (e: SyntheticInputEvent) => {
    this.setState({ numberOfTodos: parseInt(e.target.value, 10) }, () => {
      this.props.relay.setVariables({
        numberOfTodos: this.state.numberOfTodos
      });
    });
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

        <div className="form-inline">
          <div className="form-group">
            <input
              type="range"
              min="1"
              max={this.props.viewer.numberOfTodos}
              value={this.state.numberOfTodos}
              onChange={this.changeNumberOfTodoList}
            />
          </div>
        </div>
      </div>
    );
  }
}
