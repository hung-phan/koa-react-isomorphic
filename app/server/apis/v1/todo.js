export default function (router) {
  router.get('/api/v1/todos', function *() {
    this.body = [
      {
        id: 1,
        text: 'Todo 1',
        complete: false
      },
      {
        id: 2,
        text: 'Todo 2',
        complete: false
      },
      {
        id: 3,
        text: 'Todo 3',
        complete: false
      }
    ];
  });
}
