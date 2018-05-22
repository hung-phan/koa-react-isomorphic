/* @flow */
/* global process */
import { trigger } from "redial";
import isEmpty from "lodash/isEmpty";
import { match } from "react-router";
import { getBaseUrl} from "./fetch";

export const FETCH_DATA_HOOK = "FETCH_DATA_HOOK";

export const UPDATE_HEADER_HOOK = "UPDATE_HEADER_HOOK";

export const getDefaultParams = (
  store: Object,
  { location, params }: { location: Object, params: Object }
): Object => ({ store, location, params });

export const serverFetchData = (
  renderProps: Object,
  store: Object
): Promise<any> =>
  trigger(
    FETCH_DATA_HOOK,
    renderProps.components,
    getDefaultParams(store, renderProps)
  );

const redirectTo = (url: string): void => {
  if (process.env.NODE_ENV === "test") {
    global.jsdom.reconfigure({ url: `${getBaseUrl()}${url}` });
  } else if (process.env.RUNTIME_ENV === "client") {
    window.location.replace(url);
  }
};

export const clientFetchData = (
  history: Object,
  routes: Object,
  store: Object
) => {
  const callback = location =>
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        redirectTo("/500.html");
      } else if (redirectLocation) {
        redirectTo(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        if (!isEmpty(window.prerenderData)) {
          // Delete initial data so that subsequent data fetches can occur
          window.prerenderData = undefined;
        } else {
          // Fetch mandatory data dependencies for 2nd route change onwards
          trigger(
            FETCH_DATA_HOOK,
            renderProps.components,
            getDefaultParams(store, renderProps)
          );
        }

        trigger(
          UPDATE_HEADER_HOOK,
          renderProps.components,
          getDefaultParams(store, renderProps)
        );
      } else {
        redirectTo("/404.html");
      }
    });

  history.listen(callback);
  callback(history.getCurrentLocation());
};
