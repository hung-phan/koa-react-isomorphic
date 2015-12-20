import React from 'react';
import { List } from 'immutable';
import shallowEqualImmutable from 'react-immutable-render-mixin/shallowEqualImmutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchDataEnhancer from './../helpers/fetch-data-enhancer';
import TodosAdd from './../todos/todos-add';
import TodosHeader from './../todos/todos-header';
import TodosBody from './../todos/todos-body';
import { addTodo, removeTodo, completeTodo, fetchTodos } from 'app/client/actions/todos';

@fetchDataEnhancer(
  store => store.dispatch(fetchTodos())
)
@connect(
  state => ({
    todos: state.get('todos')
  }),
  dispatch => ({
    actions: bindActionCreators({
      addTodo,
      removeTodo,
      completeTodo,
      fetchTodos
    }, dispatch)
  })
)
class Todos extends React.Component {
  static propTypes = {
    todos: React.PropTypes.instanceOf(List).isRequired,
    actions: React.PropTypes.object
  }

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEqualImmutable(nextProps.todos, this.props.todos);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <TodosHeader />
          <TodosAdd addTodo={this.props.actions.addTodo} />
          <TodosBody todos={this.props.todos}
                     removeTodo={this.props.actions.removeTodo}
                     completeTodo={this.props.actions.completeTodo} />
        </div>
      </div>
    );
  }
}

export default Todos;
