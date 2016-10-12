import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { browserHistory, match, Router } from 'react-router';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import navigateTo from './navigation';

function render(props, domNode) {
  if (process.env.NODE_ENV === 'development') {
    const { AppContainer } = require('react-hot-loader');

    ReactDOM.render(
      <AppContainer>
        <Router {...props} />
      </AppContainer>,
      domNode
    );
  } else {
    ReactDOM.render(<Router {...props} />, domNode);
  }
}

export function prepareInitialRender(routes, domNode) {
  match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
    if (error) {
      navigateTo('/500.html');
    } else if (redirectLocation) {
      navigateTo(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      IsomorphicRouter.prepareInitialRender(Relay.Store, renderProps)
        .then(props => {
          render(props, domNode);
        });
    } else {
      navigateTo('/404.html');
    }
  });
}

export default function (routes, domNode) {
  if (process.env.SERVER_RENDERING) {
    IsomorphicRelay.injectPreparedData(Relay.Store, window.prerenderData);
  }

  prepareInitialRender(routes, domNode);
}
