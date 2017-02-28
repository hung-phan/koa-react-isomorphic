import isEmpty from 'lodash/isEmpty';
import { trigger } from 'redial';
import { match } from 'react-router';
import navigateTo from './navigation';
import { FETCH_DATA_HOOK, INJECT_PRELOAD_LINK_HOOK } from './redial-enhancer';

export const getLocals = (store, { location, params }) => ({
  store,
  location,
  params,
});

export const serverFetchData = (renderProps, store) =>
  trigger(FETCH_DATA_HOOK, renderProps.components, getLocals(store, renderProps));

export const clientFetchData = (history, routes, store) => {
  const callback = (location) => match(
    { routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        navigateTo('/500.html');
      } else if (redirectLocation) {
        navigateTo(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        if (!isEmpty(window.prerenderData)) {
          // Delete initial data so that subsequent data fetches can occur
          window.prerenderData = undefined;
        } else {
          // Fetch mandatory data dependencies for 2nd route change onwards
          trigger(FETCH_DATA_HOOK, renderProps.components, getLocals(store, renderProps));
        }

        trigger(INJECT_PRELOAD_LINK_HOOK, renderProps.components, getLocals(store, renderProps));
      } else {
        navigateTo('/404.html');
      }
    });

  history.listen(callback);
  callback(history.getCurrentLocation());
};
