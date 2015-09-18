import fetchData from './fetch-data';

let isFetched = false;

export default function(store, routeState) {
  if (!isFetched) {
    isFetched = true;

    fetchData(store, routeState);
  }
}
