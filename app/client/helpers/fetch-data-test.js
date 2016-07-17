import _ from 'lodash';
import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import { serverFetchData, clientFetchData, getLocals, __RewireAPI__ as Module } from './fetch-data';

describe('Helper: fetchData', () => {
  it('should be an object', () => {
    assert.isObject(Module);
  });

  context('# serverFetchData', () => {
    let routes;
    let trigger;
    let renderProps;
    let store;

    before(() => {
      routes = _.range(4);
      trigger = sinon.spy();
      store = faker.random.uuid();
      renderProps = {
        routes: _.map(routes, (component) => ({ component })),
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
      sinon.assert.calledWith(trigger, 'fetchData', routes, {
        store,
        params: renderProps.params,
        location: renderProps.location,
      });
    });
  });

  context('# clientFetchData', () => {
    let store;
    let routes;
    let browserHistoryListen;

    before(() => {
      routes = _.range(4);
      store = faker.random.uuid();
      browserHistoryListen = (callback) => callback(faker.random.uuid());
      Module.__Rewire__('browserHistory', {
        listen: browserHistoryListen,
      });
    });

    after(() => {
      Module.__ResetDependency__('browserHistory');
    });

    describe('# match route', () => {
      let navigateToSpy;
      let triggerSpy;

      beforeEach(() => {
        navigateToSpy = sinon.spy();
        triggerSpy = sinon.spy();
        Module.__Rewire__('navigateTo', navigateToSpy);
        Module.__Rewire__('trigger', triggerSpy);
      });

      afterEach(() => {
        Module.__ResetDependency__('navigateTo');
        Module.__ResetDependency__('trigger');
      });

      it('should navigate to error page', () => {
        const match = (route, callback) => {
          callback(true, undefined, undefined);
        };

        Module.__Rewire__('match', match);

        clientFetchData(routes, store);
        sinon.assert.calledWith(navigateToSpy, '/500.html');

        Module.__ResetDependency__('match');
      });

      it('should redirect to /hello-world.html page', () => {
        const match = (route, callback) => {
          callback(undefined, { pathname: '/hello-world.html', search: '' }, undefined);
        };

        Module.__Rewire__('match', match);

        clientFetchData(routes, store);
        sinon.assert.calledWith(navigateToSpy, '/hello-world.html');

        Module.__ResetDependency__('match');
      });

      it('should trigger fetchData', () => {
        const renderProps = {
          components: _.range(4),
          location: '/',
          params: {
            test: faker.random.uuid(),
          },
        };
        const match = (route, callback) => {
          callback(undefined, undefined, renderProps);
        };

        Module.__Rewire__('match', match);

        clientFetchData(routes, store);
        sinon.assert.calledWith(
          triggerSpy, 'fetchData', renderProps.components, getLocals(store, renderProps)
        );

        Module.__ResetDependency__('match');
      });

      it('should navigate to /404.html page', () => {
        const match = (route, callback) => {
          callback(undefined, undefined, undefined);
        };

        Module.__Rewire__('match', match);

        clientFetchData(routes, store);
        sinon.assert.calledWith(navigateToSpy, '/404.html');

        Module.__ResetDependency__('match');
      });
    });
  });
});
