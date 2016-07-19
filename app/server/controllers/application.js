// @flow
export default function (router: Object) {
  router.get('*', async (ctx) => {
    ctx.body = await ctx.prerender('application/index.marko');
  });
}
