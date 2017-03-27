import _ from 'lodash';
import td from 'testdouble';
import faker from 'faker';
import { assert } from 'chai';
import { __RewireAPI__ as Module, clientFetchData, FETCH_DATA_HOOK, getDefaultParams, serverFetchData } from '../fetchData';

describe('Helper: fetchData', () => {
  it('should be an object', () => {
    assert.isObject(Module);
  });

  context('# serverFetchData', () => {
    let trigger;
    let renderProps;
    let components;
    let store;

    before(() => {
      components = _.range(4);
      trigger = td.function();
      store = faker.random.uuid();
      renderProps = {
        components: _.range(4),
        params: faker.random.uuid(),
        location: faker.random.uuid(),
      };

      Module.__Rewire__('trigger', trigger);

      serverFetchData(renderProps, store);
    });

    after(() => {
      Module.__ResetDependency__('trigger');
    });

    it('should call "trigger" with "components" and "locals"', () => {
      td.verify(trigger(FETCH_DATA_HOOK, components, {
        store,
        params: renderProps.params,
        location: renderProps.location,
      }));
    });
  });

  context('# clientFetchData', () => {
    let history;
    let store;
    let components;

    before(() => {
      history = {
        listen: callback => callback(faker.random.uuid()),
        getCurrentLocation: _.noop
      };
      components = _.range(4);
      store = faker.random.uuid();
    });

    describe('# match route', () => {
      let navigateToSpy;
      let triggerSpy;

      beforeEach(() => {
        navigateToSpy = td.function();
        triggerSpy = td.function();
        Module.__Rewire__('redirectTo', navigateToSpy);
        Module.__Rewire__('trigger', triggerSpy);
      });

      afterEach(() => {
        Module.__ResetDependency__('redirectTo');
        Module.__ResetDependency__('trigger');
      });

      it('should navigate to error page', () => {
        const match = (route, callback) => {
          callback(true, undefined, undefined);
        };

        Module.__Rewire__('match', match);

        clientFetchData(history, components, store);
        td.verify(navigateToSpy('/500.html'));

        Module.__ResetDependency__('match');
      });

      it('should redirect to /hello-world.html page', () => {
        const match = (route, callback) => {
          callback(undefined, { pathname: '/hello-world.html', search: '' }, undefined);
        };

        Module.__Rewire__('match', match);

        clientFetchData(history, components, store);
        td.verify(navigateToSpy('/hello-world.html'));

        Module.__ResetDependency__('match');
      });

      it('should trigger not FETCH_DATA_HOOK', () => {
        const renderProps = {
          components,
          location: '/',
          params: {
            test: faker.random.uuid(),
          },
        };
        const match = (route, callback) => {
          callback(undefined, undefined, renderProps);
        };

        window.prerenderData = faker.random.uuid();
        Module.__Rewire__('match', match);

        clientFetchData(history, components, store);

        assert.isUndefined(window.prerenderData);

        Module.__ResetDependency__('match');
      });

      it('should trigger FETCH_DATA_HOOK', () => {
        const renderProps = {
          components,
          location: '/',
          params: {
            test: faker.random.uuid(),
          },
        };
        const match = (route, callback) => {
          callback(undefined, undefined, renderProps);
        };

        Module.__Rewire__('match', match);

        clientFetchData(history, components, store);
        td.verify(
          triggerSpy(FETCH_DATA_HOOK, renderProps.components, getDefaultParams(store, renderProps))
        );

        Module.__ResetDependency__('match');
      });

      it('should navigate to /404.html page', () => {
        const match = (route, callback) => {
          callback(undefined, undefined, undefined);
        };

        Module.__Rewire__('match', match);

        clientFetchData(history, components, store);
        td.verify(navigateToSpy('/404.html'));

        Module.__ResetDependency__('match');
      });
    });
  });
});
