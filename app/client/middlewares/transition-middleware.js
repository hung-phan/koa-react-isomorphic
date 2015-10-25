import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';
import fetchData from 'app/client/helpers/fetch-data';

export default store => next => action => {
  if (action.type === ROUTER_DID_CHANGE) {
    const promise = fetchData(store, action.payload)
            .then(result => {
              console.log(result);
            });

    if (process.env.RUNTIME_ENV === 'server') {
      store.getState().router = promise;
    }
  } else {
    next(action);
  }
};
