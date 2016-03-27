import React from 'react';

/* istanbul ignore next */
export default function (ComposedComponent, props = {}, stubs = {}) {
  function RouterStub() { }

  Object.assign(RouterStub, {
    makePath() {},
    makeHref() {},
    transitionTo() {},
    replaceWith() {},
    goBack() {},
    getCurrentPath() {},
    getCurrentRoutes() {},
    getCurrentPathname() {},
    getCurrentParams() {},
    getCurrentQuery() {},
    isActive() {},
    getRouteAtDepth() {},
    setRouteComponentAtDepth() {},
  }, stubs);

  return class extends React.Component {
    static childContextTypes = {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number,
    };

    getChildContext() {
      return {
        router: RouterStub,
        routeDepth: 0,
      };
    }

    render() {
      return (
        <ComposedComponent {...props} />
      );
    }
  };
}
