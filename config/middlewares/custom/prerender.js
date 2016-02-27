if (process.env.SERVER_RENDERING) {
  const PORT = process.env.PORT || 3000;
  const nunjucks = require('nunjucks');
  const React = require('react');
  const Relay = require('react-relay');
  const { renderToString } = require('react-dom/server');
  const { match, RouterContext } = require('react-router');
  const IsomorphicRouter = require('isomorphic-relay-router').default;
  const routes = require('app/routes').default;
  const settings = require('config/initializers/settings').default;

  // inject Relay network request
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(`http://localhost:${PORT}/graphql`)
  );

  module.exports = function* (next) {
    this.prerender = this.prerender ||
      function (template: string, initialState: Object = {}, parameters: Object = {}) {
        return new Promise((resolve) => {
          match({ routes, location: this.req.url }, (error, redirectLocation, renderProps) => {
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

                  resolve(
                    nunjucks.render(template, {
                      ...settings,
                      ...parameters,
                      prerenderComponent,
                      prerenderData,
                      csrf: this.csrf,
                    })
                  );
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
