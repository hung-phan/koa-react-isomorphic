import React from 'react';

export class TodosAdd extends React.Component {
  static propTypes = {
    addTodo: React.PropTypes.func,
  };

  state = {
    todo: '',
  };

  updateTodo = (e) => {
    this.setState({ todo: e.target.value });
  }

  addTodo = () => {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: '' });
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
      </div>
    );
  }
}

export default TodosAdd;
