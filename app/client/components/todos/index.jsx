// @flow
import React from 'react';
import Relay from 'react-relay';
import { compose, onlyUpdateForKeys } from 'recompose';
import AddTodoMutation from 'client/mutations/add-todo';
import CompleteTodoMutation from 'client/mutations/complete-todo';
import RemoveTodoMutation from 'client/mutations/remove-todo';
import TodosHeader from './todos-header';
import TodosAdd from './todos-add';
import TodosBody from './todos-body';
import TodosFooter from './todos-footer';
import type { ViewerType } from './types';
import redialEnhancer, { INJECT_PRELOAD_LINK_HOOK } from './../../helpers/redial-enhancer';

export const Todos = ({ viewer, relay }: { viewer: ViewerType, relay: Object }) => (
  <div className="container">
    <div className="row">
      <TodosHeader />
      <TodosAdd relay={relay} viewer={viewer} />
      <TodosBody viewer={viewer} />
      <TodosFooter />
    </div>
  </div>
);

export const enhance = compose(
  redialEnhancer({
    [INJECT_PRELOAD_LINK_HOOK]: ({ helmetObserver }) => {
      helmetObserver.next({
        link: [
          { rel: 'preload', href: window.javascriptAssets['static-page'], as: 'script' },
        ],
      });
    },
  }),
  Component =>
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
