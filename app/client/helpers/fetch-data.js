export default function fetchData(store, { routes, params }) {
  const promises = routes
                     .filter(route => route.component.fetchData)
                     .map(route => route.component.fetchData(store, params));

  return Promise.all(promises);
}
