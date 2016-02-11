import React from 'react';
import autobind from 'autobind-decorator';

class AddTodo extends React.Component {
  static propTypes = {
    addTodo: React.PropTypes.func,
  };

  constructor() {
    super(...arguments);

    this.state = { todo: '' };
  }

  @autobind
  updateTodo(e) {
    this.setState({ todo: e.target.value });
  }

  @autobind
  addTodo() {
    this.props.addTodo(this.state.todo);
    this.setState({ todo: '' });
  }

  render() {
    return (
      <div className='col-md-12'>
        <div className='form-inline'>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Todo'
              value={this.state.todo} onChange={this.updateTodo}
            />
          </div>
          <button type='button' className='btn btn-success' onClick={this.addTodo}>Add Todo</button>
        </div>
      </div>
    );
  }
}

export default AddTodo;
