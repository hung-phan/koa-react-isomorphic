export default function (router) {
  router.get('/api/v1/todos', function *() {
    this.body = [
      {
        text: 'Todo 1',
        complete: false
      },
      {
        text: 'Todo 2',
        complete: false
      },
      {
        text: 'Todo 3',
        complete: false
      }
    ];
  });
}
