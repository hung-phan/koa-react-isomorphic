import React from 'react';
import Relay from 'react-relay';
import { compose, onlyUpdateForKeys } from 'recompose';
import TodosHeader from './todos-header';
import TodosAdd from './todos-add';
import TodosBody from './todos-body';
import AddTodoMutation from 'client/mutations/add-todo';
import CompleteTodoMutation from 'client/mutations/complete-todo';
import RemoveTodoMutation from 'client/mutations/remove-todo';

/* eslint-disable react/prefer-stateless-function */
export class Todos extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    relay: React.PropTypes.object,
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <TodosHeader />
          <TodosAdd relay={this.props.relay} viewer={this.props.viewer} />
          <TodosBody viewer={this.props.viewer} />
        </div>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

export const enhance = compose(
  (Component) =>
    Relay.createContainer(Component, {
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
    }),
  onlyUpdateForKeys(['viewer', 'relay'])
);

export default enhance(Todos);
