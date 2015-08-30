import R                       from 'ramda';
import React                   from 'react';
import { bindActionCreators }  from 'redux';
import { connect }             from 'react-redux';
import { addTodo, fetchTodos } from 'app/client/actions/todos';
import AddTodo                 from './../todos/add-todo/add-todo';
import fetchDataEnhancer       from './../helpers/fetch-data-enhancer';

@fetchDataEnhancer(store => store.dispatch(fetchTodos()))
@connect(R.pick(['todos']), (dispatch) => {
  const actions = bindActionCreators({ addTodo, fetchTodos }, dispatch);
  return { actions };
})
class Todos extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Todos List</h1>
          </div>
          <div className='col-md-12'>
            <AddTodo addTodo={this.props.actions.addTodo} />
          </div>
          <div className='col-md-12'>
            <pre>{JSON.stringify(this.props.todos)}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Todos;
