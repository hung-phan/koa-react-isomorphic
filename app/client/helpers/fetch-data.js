import map from 'lodash/fp/map';
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
        trigger('fetchData', renderProps.components, getLocals(store, renderProps));
      } else {
        navigateTo('/404.html');
      }
    });
  });
}
