import _ from "lodash";
import faker from "faker";

describe("Helper: fetchData", () => {
  let redial;
  let reactRouter;
  let fetchData;

  beforeAll(() => {
    jest.mock("redial", () => jest.genMockFromModule("redial"));
    jest.mock("react-router", () => jest.genMockFromModule("react-router"));

    redial = require("redial");
    reactRouter = require("react-router");
    fetchData = require("../fetchData");
  });

  afterAll(() => {
    jest.unmock("redial");
    jest.unmock("react-router");
  });

  describe("# serverFetchData", () => {
    let components;
    let renderProps;
    let store;

    beforeAll(() => {
      components = _.range(4);
      renderProps = {
        components: _.range(4),
        params: faker.random.uuid(),
        location: faker.random.uuid()
      };
      store = faker.random.uuid();
    });

    it("should call 'trigger' with 'components' and 'locals'", () => {
      fetchData.serverFetchData(renderProps, store);

      expect(redial.trigger).toBeCalledWith(
        fetchData.FETCH_DATA_HOOK,
        components,
        {
          store,
          params: renderProps.params,
          location: renderProps.location
        }
      );
    });
  });

  describe("# clientFetchData", () => {
    let history;
    let store;
    let components;

    beforeAll(() => {
      history = {
        listen: callback => callback(faker.random.uuid()),
        getCurrentLocation: _.noop
      };
      components = _.range(4);
      store = faker.random.uuid();
    });

    describe("# match route", () => {
      it("should navigate to error page", () => {
        fetchData.clientFetchData(history, components, store);
        reactRouter.match.mock.calls[0][1](true);
        expect(window.location.href).toEqual("/500.html");
      });

      it("should redirect to /hello-world.html page", () => {
        fetchData.clientFetchData(history, components, store);
        reactRouter.match.mock.calls[0][1](undefined, {
          pathname: "/hello-world.html",
          search: ""
        });
        expect(window.location.href).toEqual("/hello-world.html");
      });

      it("should trigger not FETCH_DATA_HOOK", () => {
        window.prerenderData = faker.random.uuid();

        fetchData.clientFetchData(history, components, store);
        reactRouter.match.mock.calls[0][1](undefined, undefined, {
          components,
          location: "/",
          params: {
            test: faker.random.uuid()
          }
        });

        expect(window.prerenderData).toBeUndefined();
      });

      it("should trigger FETCH_DATA_HOOK", () => {
        const renderProps = {
          components,
          location: "/",
          params: {
            test: faker.random.uuid()
          }
        };

        fetchData.clientFetchData(history, components, store);
        reactRouter.match.mock.calls[0][1](undefined, undefined, renderProps);

        expect(redial.trigger).toBeCalledWith(
          fetchData.FETCH_DATA_HOOK,
          renderProps.components,
          fetchData.getDefaultParams(store, renderProps)
        );
      });

      it("should navigate to /404.html page", () => {
        fetchData.clientFetchData(history, components, store);
        reactRouter.match.mock.calls[0][1](undefined, undefined, undefined);

        expect(window.location.href).toEqual("/404.html");
      });
    });
  });
});
