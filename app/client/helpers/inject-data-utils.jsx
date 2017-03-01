import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { trigger } from 'redial';
import { browserHistory as history, match } from 'react-router';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import App from 'client/components/main/app';
import navigateTo from './navigation';
import { INJECT_PRELOAD_LINK_HOOK } from './redial-enhancer';

export function prepareInitialRender(routes, domNode) {
  const callback = location => match(
    { routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        navigateTo('/500.html');
      } else if (redirectLocation) {
        navigateTo(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        IsomorphicRouter.prepareInitialRender(Relay.Store, renderProps)
          .then(props => {
            ReactDOM.render(<App {...props} />, domNode);
          });

        trigger(INJECT_PRELOAD_LINK_HOOK, renderProps.components, renderProps);
      } else {
        navigateTo('/404.html');
      }
    }
  );

  history.listen(callback);
  callback(history.getCurrentLocation());
}

export default function (routes, domNode) {
  if (process.env.SERVER_RENDERING) {
    IsomorphicRelay.injectPreparedData(Relay.Store, window.prerenderData);
  }

  prepareInitialRender(routes, domNode);
}
