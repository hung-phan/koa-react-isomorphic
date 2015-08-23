export default function(router) {
  router.get('/api/v1/todos', function *() {
    this.body = [
      {
        name: 'Todo 1',
        complete: false
      },
      {
        name: 'Todo 2',
        complete: false
      },
      {
        name: 'Todo 3',
        complete: false
      }
    ];
  });
}
