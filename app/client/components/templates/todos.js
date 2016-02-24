import React from 'react';
import Relay from 'react-relay';
import TodosHeader from 'app/client/components/todos/todos-header';
import TodosAdd from 'app/client/components/todos/todos-add';
import TodosBody from 'app/client/components/todos/todos-body';
import AddTodoMutation from 'app/client/mutations/add-todo';
import CompleteTodoMutation from 'app/client/mutations/complete-todo';
import RemoveTodoMutation from 'app/client/mutations/remove-todo';

export class Todos extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    relay: React.PropTypes.object,
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <TodosHeader />
          <TodosAdd relay={this.props.relay} viewer={this.props.viewer} />
          <TodosBody viewer={this.props.viewer} />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Todos, {
  initialVariables: {
    numberOfTodos: 10,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        todos(last: $numberOfTodos) {
          edges {
            node {
              id
              text
              complete
            }
          }
        }
        numberOfTodos
        ${AddTodoMutation.getFragment('viewer')}
        ${CompleteTodoMutation.getFragment('viewer')}
        ${RemoveTodoMutation.getFragment('viewer')}
      }
    `,
  },
});
