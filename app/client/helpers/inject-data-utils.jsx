import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { browserHistory, match, Router } from 'react-router';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { navigateTo } from './navigation';

export function injectPreparedData() {
  IsomorphicRelay.injectPreparedData(Relay.Store, window.prerenderData);
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
          ReactDOM.render(<Router {...props} />, domNode);
        });
    } else {
      navigateTo('/404.html');
    }
  });
}

export function init(routes, domNode) {
  if (process.env.SERVER_RENDERING) {
    injectPreparedData();
    prepareInitialRender(routes, domNode);
  } else {
    ReactDOM.render(routes, domNode);
  }
}
