// @flow
export default function (router: Object) {
  router.get('/api/v1/todos', (ctx) => {
    ctx.body = [
      {
        text: 'Todo 1',
        complete: false,
      },
      {
        text: 'Todo 2',
        complete: false,
      },
      {
        text: 'Todo 3',
        complete: false,
      },
    ];
  });
}
