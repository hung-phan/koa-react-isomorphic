import _ from 'lodash';
import { trigger } from 'redial';
import { match } from 'react-router';

export function getComponents(renderProps) {
  return _.map(renderProps.routes, 'component');
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
