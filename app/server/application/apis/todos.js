/* @flow */
import { all } from '../../infrastructure/daos/TodosDAO';

export default (router: Object) => {
  router.get('/api/v1/todos', async (ctx: Object) => {
    ctx.body = await all();
  });
};
