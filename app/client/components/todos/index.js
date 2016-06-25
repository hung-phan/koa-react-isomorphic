import React from 'react';
import Relay from 'react-relay';
import { compose, onlyUpdateForKeys } from 'recompose';
import { createContainer } from 'recompose-relay';
import TodosHeader from './todos-header';
import TodosAdd from './todos-add';
import TodosBody from './todos-body';
import TodosFooter from './todos-footer';
import AddTodoMutation from 'client/mutations/add-todo';
import CompleteTodoMutation from 'client/mutations/complete-todo';
import RemoveTodoMutation from 'client/mutations/remove-todo';

export const Todos = ({ viewer, relay }) => (
  <div className="container">
    <div className="row">
      <TodosHeader />
      <TodosAdd relay={relay} viewer={viewer} />
      <TodosBody viewer={viewer} />
      <TodosFooter />
    </div>
  </div>
);

Todos.propTypes = {
  viewer: React.PropTypes.object,
  relay: React.PropTypes.object,
};

export const enhance = compose(
  createContainer({
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
