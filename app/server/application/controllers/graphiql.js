import packageJson from "../../../../package.json";

export default (router: Object) => {
  router.get("/graphql", async (ctx: Object) => {
    ctx.body = await ctx.render("layouts/graphiql.marko", {
      // remove ^ from graphql version
      graphqlVersion: packageJson.dependencies.graphql.slice(1)
    });
  });
};
