import map from 'lodash/fp/map';
import { trigger } from 'redial';
import { match } from 'react-router';

export function getComponents(renderProps) {
  return map('component', renderProps.routes);
}

export function fetchData(renderProps, store) {
  const locals = {
    store,
    params: renderProps.params,
  };

  return trigger('fetchData', getComponents(renderProps), locals);
}

export function clientFetchData(routes, location, store) {
  return new Promise((resolve, reject) => {
    match({ routes, location }, (routerError, redirectLocation, renderProps) => {
      fetchData(renderProps, store)
        .then(resolve)
        .catch(reject);
    });
  });
}
