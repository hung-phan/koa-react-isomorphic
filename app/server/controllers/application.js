export default function(router) {
  router.get('*', function *() {
    this.body = this.prerender('application/index.html');
  });
}
