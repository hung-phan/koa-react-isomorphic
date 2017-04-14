/* @flow */
import { all } from "../../domain/repositories/TodoDAO";

export default (router: Object) => {
  router.get("/api/v1/todos", async (ctx: Object) => {
    ctx.body = await all();
  });
};
