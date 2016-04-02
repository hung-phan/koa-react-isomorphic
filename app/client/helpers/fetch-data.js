import map from 'lodash/fp/map';
import { trigger } from 'redial';
import { browserHistory, match } from 'react-router';

function getLocals(store, renderProps) {
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
        window.location.href = '/500.html';
      } else if (redirectLocation) {
        window.location.href = redirectLocation.pathname + redirectLocation.search;
      } else if (renderProps) {
        trigger('fetchData', renderProps.components, getLocals(store, renderProps));
      } else {
        window.location.href = '/404.html';
      }
    });
  });
}
