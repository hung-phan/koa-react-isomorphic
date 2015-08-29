export default function(router) {
  router.get('*', function *() {
    this.body = yield this.prerender('application/index.html');
  });
}
