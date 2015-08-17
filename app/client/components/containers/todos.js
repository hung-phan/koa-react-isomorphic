'use strict';

import R                                    from 'ramda';
import React                                from 'react';
import { bindActionCreators }               from 'redux';
import { connect }                          from 'react-redux';
import { addTodo, removeTodo, completeTodo} from 'app/client/actions/todos';
import AddTodo                              from './../add-todo/add-todo';

class Todos extends React.Component {
  render() {

    return (
      <div className='row'>
        <div className='col-md-12'>
          <h1>Todos List</h1>
        </div>

        <div className='col-md-12'>
          <AddTodo addTodo={this.props.actions.addTodo} />
        </div>

        <div className='col-md-12'>
          {JSON.stringify(this.props.todos)}
        </div>
      </div>
    );
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators({
      addTodo, removeTodo, completeTodo
    }, dispatch)
  };
}

export default connect(R.pick(['todos']), mapDispatch)(Todos);
