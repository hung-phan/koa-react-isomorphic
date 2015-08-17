'use strict';

import React from 'react';

class AddTodo extends React.Component {
  constructor() {
    super(...arguments);

    this.state = { todo: '' };

    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  updateTodo(e) {
    this.setState({ todo: e.target.value });
  }

  addTodo() {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: '' });
  }

  render() {
    return (
      <form className='form-inline'>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Todo'
            value={this.state.todo} onChange={this.updateTodo} />
        </div>
        <button type='button' className='btn btn-success' onClick={this.addTodo}>Add Todo</button>
      </form>
    );
  }
}

export default AddTodo;
