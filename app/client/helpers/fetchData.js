/* @flow */
import isEmpty from 'lodash/isEmpty';
import { trigger } from 'redial';
import { match } from 'react-router';
import { redirectTo } from './handleHTTP';

export const FETCH_DATA_HOOK = 'FETCH_DATA_HOOK';

export const INJECT_PRELOAD_LINK_HOOK = 'INJECT_PRELOAD_LINK_HOOK';

export const getDefaultParams = (
  store: Object,
  { location, params }: { location: Object, params: Object }
): Object => ({ store, location, params });

export const serverFetchData = (renderProps: Object, store: Object): Promise<any> =>
  trigger(FETCH_DATA_HOOK, renderProps.components, getDefaultParams(store, renderProps));

export const clientFetchData = (history: Object, routes: Object, store: Object) => {
  const callback = (location) => match(
    { routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        redirectTo('/500.html');
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
          INJECT_PRELOAD_LINK_HOOK,
          renderProps.components,
          getDefaultParams(store, renderProps)
        );
      } else {
        redirectTo('/404.html');
      }
    });

  history.listen(callback);
  callback(history.getCurrentLocation());
};
