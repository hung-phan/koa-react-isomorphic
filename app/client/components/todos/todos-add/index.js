import React from 'react';
import Relay from 'react-relay';
import { pure } from 'recompose';
import AddTodoMutation from 'client/mutations/add-todo';

export class TodosAdd extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = { todo: '', numberOfTodos: 20 };
  }

  updateTodo = (e) => {
    this.setState({ todo: e.target.value });
  }

  addTodo = () => {
    Relay.Store.commitUpdate(new AddTodoMutation({ text: this.state.todo, viewer: this.props.viewer }));
    this.setState({ todo: '' });
  }

  changeNumberOfTodoList = (e) => {
    this.setState({ numberOfTodos: parseInt(e.target.value, 10) }, () => {
      this.props.relay.setVariables({ numberOfTodos: this.state.numberOfTodos });
    });
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="form-inline">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Todo"
              value={this.state.todo} onChange={this.updateTodo}
            />
          </div>
          <button type="button" className="btn btn-success" onClick={this.addTodo}>Add Todo</button>
        </div>

        <div className="form-inline">
          <div className="form-group">
            <input
              type="range"
              min="1"
              max={this.props.viewer.numberOfTodos}
              value={this.state.numberOfTodos} onChange={this.changeNumberOfTodoList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default pure(TodosAdd);
