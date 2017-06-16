/* @flow */
export default (router: Object) => {
  router.get("*", async (ctx: Object) => {
    ctx.body = await ctx.render("application/index.marko");
  });
};
