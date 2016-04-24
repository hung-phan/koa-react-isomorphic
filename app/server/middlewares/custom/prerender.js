if (process.env.SERVER_RENDERING) {
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const { match, RouterContext } = require('react-router');
  const IsomorphicRouter = require('isomorphic-relay-router').default;
  const { getRoutes, getServerHistory } = require('app/routes');

  module.exports = function* (next) {
    this.prerender = this.prerender ||
      function (template: string, parameters: Object = {}) {
        return new Promise((resolve, reject) => {
          match({
            routes: getRoutes(getServerHistory(this.req.url)),
            location: this.req.url,
          }, (error, redirectLocation, renderProps) => {
            if (error) {
              this.throw(500, error.message);
            } else if (redirectLocation) {
              this.redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
              IsomorphicRouter.prepareData(renderProps)
                .then(({ data: prerenderData, props }) => {
                  const prerenderComponent = renderToString(
                    <IsomorphicRouter.RouterContext {...props} />
                  );

                  this.render(template, {
                    ...parameters,
                    prerenderComponent,
                    prerenderData,
                  })
                  .then(resolve)
                  .catch(reject);
                });
            } else {
              this.throw(404);
            }
          });
        });
      };
    yield next;
  };
} else {
  module.exports = function* (next) {
    this.prerender = this.render;
    yield next;
  };
}
