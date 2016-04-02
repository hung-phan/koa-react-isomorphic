import _ from 'lodash';
import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import rewire from 'rewire';

const Module = rewire('./fetch-data');

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

      Module.serverFetchData(renderProps, store);
    });

    after(() => {
      Module.__ResetDependency__('trigger');
    });

    it(`should call 'trigger' with 'components' and 'locals'`, () => {
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

    describe('# error', () => {
      let windowLocation;
      let match;

      before(() => {
        windowLocation = { href: '/' };
        match = (route, callback) => {
          callback(true, undefined, undefined);
        };
        Module.__Rewire__('match', match);
        Module.__Rewire__('window.location', windowLocation);

        Module.clientFetchData(routes, store);
      });

      after(() => {
        Module.__ResetDependency__('match');
        Module.__ResetDependency__('window.location');
      });
    });
  });
});
