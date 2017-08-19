/* @flow */
import React from "react";
import { commit as addTodoAction } from "../../mutations/AddTodoMutation";
import type { todos_viewer } from "./__generated__/todos_viewer.graphql";

export default class TodosAdd extends React.PureComponent<
  {
    viewer: todos_viewer,
    relay: Object
  },
  { todo: string, numberOfTodos: number }
> {
  state = {
    todo: "",
    numberOfTodos: 20
  };

  updateTodo = (e: Object) => {
    this.setState({ todo: e.target.value });
  };

  addTodo = () => {
    addTodoAction(this.state.todo, this.props.viewer.id);
    this.setState({ todo: "" });
  };

  changeNumberOfTodoList = (e: SyntheticInputEvent<*>) => {
    this.setState({ numberOfTodos: parseInt(e.target.value, 10) }, () => {
      this.props.relay.refetch(() => ({
        numberOfTodos: this.state.numberOfTodos
      }));
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
