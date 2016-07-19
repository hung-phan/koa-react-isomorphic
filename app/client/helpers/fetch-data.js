import map from 'lodash/fp/map';
import isEmpty from 'lodash/isEmpty';
import { trigger } from 'redial';
import { browserHistory, match } from 'react-router';
import { navigateTo } from './navigation';

export function getLocals(store, renderProps) {
  return {
    store,
    location: renderProps.location,
    params: renderProps.params,
  };
}

export function serverFetchData(renderProps, store) {
  return trigger('fetchData', map('component', renderProps.routes), getLocals(store, renderProps));
}

export function clientFetchData(routes, store) {
  browserHistory.listen(location => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        navigateTo('/500.html');
      } else if (redirectLocation) {
        navigateTo(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        if (!isEmpty(window.__data)) {
          // Delete initial data so that subsequent data fetches can occur
          delete window.__data;
        } else {
          // Fetch mandatory data dependencies for 2nd route change onwards
          trigger('fetchData', renderProps.components, getLocals(store, renderProps));
        }
      } else {
        navigateTo('/404.html');
      }
    });
  });
}
