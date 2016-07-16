export default function (router) {
  router.get('*', async (ctx) => {
    ctx.body = await ctx.prerender('application/index.marko');
  });
}
