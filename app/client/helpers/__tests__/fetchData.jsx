import _ from "lodash";
import React from "react";
import td from "testdouble";
import faker from "faker";
import { Store } from "react-relay";
import { __RewireAPI__ as Module, prepareInitialRender } from "../fetchData";

describe("Helper: fetchData", () => {
  describe("# prepareInitialRender", () => {
    let browserHistoryListen;
    let domNode;
    let routes;
    let defaultProps;

    beforeAll(() => {
      routes = _.range(4);
      domNode = faker.random.uuid();
      defaultProps = faker.random.uuid();
      browserHistoryListen = callback => callback(faker.random.uuid());
      Module.__Rewire__("browserHistory", {
        listen: browserHistoryListen
      });
    });

    afterAll(() => {
      Module.__ResetDependency__("browserHistory");
    });

    describe("# match route", () => {
      let navigateToSpy;
      let prepareInitialRenderStub;

      beforeEach(() => {
        navigateToSpy = td.function();
        prepareInitialRenderStub = td.function();
        td
          .when(
            prepareInitialRenderStub(
              td.matchers.anything(),
              td.matchers.anything()
            )
          )
          .thenReturn({
            then: callback => callback(defaultProps)
          });

        Module.__Rewire__("redirectTo", navigateToSpy);
        Module.__Rewire__("IsomorphicRouter", {
          prepareInitialRender: prepareInitialRenderStub
        });
      });

      afterEach(() => {
        Module.__ResetDependency__("redirectTo");
        Module.__ResetDependency__("IsomorphicRouter");
        Module.__ResetDependency__("match");
        Module.__ResetDependency__("Router");
        Module.__ResetDependency__("ReactDOM");
      });

      it("should navigate to error page", () => {
        const match = (route, callback) => {
          callback(true, undefined, undefined);
        };

        Module.__Rewire__("match", match);

        prepareInitialRender(routes, domNode);
        td.verify(navigateToSpy("/500.html"));
      });

      it("should redirect to /hello-world.html page", () => {
        const match = (route, callback) => {
          callback(
            undefined,
            { pathname: "/hello-world.html", search: "" },
            undefined
          );
        };

        Module.__Rewire__("match", match);

        prepareInitialRender(routes, domNode);
        td.verify(navigateToSpy("/hello-world.html"));
      });

      it("should trigger fetchData", () => {
        const renderProps = {
          components: _.range(4),
          location: "/",
          params: {
            test: faker.random.uuid()
          }
        };
        const match = (route, callback) => {
          callback(undefined, undefined, renderProps);
        };

        Module.__Rewire__("match", match);
        Module.__Rewire__("Router", props => (
          <div>{JSON.stringify(props)}</div>
        ));
        Module.__Rewire__("ReactDOM", {
          render: () => true
        });

        prepareInitialRender(routes, domNode);
        td.verify(prepareInitialRenderStub(Store, renderProps));
      });

      it("should navigate to /404.html page", () => {
        const match = (route, callback) => {
          callback(undefined, undefined, undefined);
        };

        Module.__Rewire__("match", match);

        prepareInitialRender(routes, domNode);
        td.verify(navigateToSpy("/404.html"));
      });
    });
  });
});
