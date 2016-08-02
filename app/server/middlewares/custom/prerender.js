// @flow
export default async (ctx: Object, next: Function) => {
  if (process.env.SERVER_RENDERING) {
    const { renderToString } = require('react-dom/server');
    const { match } = require('react-router');
    const DefaultNetworkLayer = require('react-relay').DefaultNetworkLayer;
    const IsomorphicRouter = require('isomorphic-relay-router').default;
    const { getRoutes, getServerHistory } = require('app/routes.jsx');

    const networkLayer = new DefaultNetworkLayer(
      // $FlowFixMe
      `http://localhost:${process.env.PORT}/graphql`
    );

    ctx.prerender = (template: string, parameters: Object = {}) =>
      new Promise((resolve, reject) => {
        match({
          routes: getRoutes(getServerHistory(ctx.req.url)),
          location: ctx.req.url,
        }, (error, redirectLocation, renderProps) => {
          if (error) {
            ctx.throw(500, error.message);
          } else if (redirectLocation) {
            ctx.redirect(redirectLocation.pathname + redirectLocation.search);
          } else if (renderProps) {
            IsomorphicRouter.prepareData(renderProps, networkLayer)
              .then(({ data: prerenderData, props }) => {
                const prerenderComponent = renderToString(IsomorphicRouter.render(props));

                ctx.render(template, {
                  ...parameters,
                  prerenderComponent,
                  prerenderData,
                }).then(resolve).catch(reject);
              });
          } else {
            ctx.throw(404);
          }
        });
      });
    await next();
  } else {
    ctx.prerender = ctx.render;
    await next();
  }
};
