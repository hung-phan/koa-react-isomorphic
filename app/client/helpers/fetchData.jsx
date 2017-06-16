/* @flow */
import Rx from "rxjs/Rx";
import React from "react";
import Relay from "react-relay/classic";
import { trigger } from "redial";
import ReactDOM from "react-dom";
import { browserHistory as history, match } from "react-router";
import IsomorphicRelay from "isomorphic-relay";
import IsomorphicRouter from "isomorphic-relay-router";
import App from "../components/app";
import { redirectTo } from "./handleHTTP";

export const helmetObserver = new Rx.Subject();

export const UPDATE_HEADER_HOOK = "UPDATE_HEADER_HOOK";

export const createHandler = (callback: Function) => (
  error: ?Object,
  redirectLocation: { pathname: string, search: string },
  renderProps: ?Object
) => {
  if (error) {
    redirectTo("/500.html");
  } else if (redirectLocation) {
    redirectTo(redirectLocation.pathname + redirectLocation.search);
  } else if (renderProps) {
    callback(renderProps);
  } else {
    redirectTo("/404.html");
  }
};

export const getDefaultParams = ({ location, params }: { location: Object, params: Object }) => ({
  helmetObserver,
  location,
  params
});

export const prepareInitialRender = (routes: Object, domNode: Object) => {
  match(
    { routes, history },
    createHandler(renderProps => {
      IsomorphicRouter.prepareInitialRender(
        Relay.Store,
        renderProps
      ).then(props => {
        ReactDOM.render(<App {...props} />, domNode);

        trigger(
          UPDATE_HEADER_HOOK,
          renderProps.components,
          getDefaultParams(renderProps)
        );
      });
    })
  );

  history.listen(location => {
    match(
      { routes, location },
      createHandler(renderProps => {
        trigger(
          UPDATE_HEADER_HOOK,
          renderProps.components,
          getDefaultParams(renderProps)
        );
      })
    );
  });
};

export default (routes: Object, domNode: Object) => {
  if (process.env.SERVER_RENDERING) {
    IsomorphicRelay.injectPreparedData(Relay.Store, window.prerenderData);
  }

  prepareInitialRender(routes, domNode);
};
