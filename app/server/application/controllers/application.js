/* @flow */
export default (router: Object) => {
  router.get('*', async (ctx: Object) => {
    ctx.body = await ctx.prerender('application/index.marko');
  });
};
