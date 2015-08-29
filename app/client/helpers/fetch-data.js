export default function fetchData(store, { routes, params }) {
  const promises = routes
                     .filter(route => route.handler.fetchData)
                     .map(route => route.handler.fetchData(store, params));

  return Promise.all(promises);
}
