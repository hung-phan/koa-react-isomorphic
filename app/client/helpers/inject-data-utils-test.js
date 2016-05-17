import _ from 'lodash';
import sinon from 'sinon';
import faker from 'faker';
import rewire from 'rewire';
import { Store } from 'react-relay';

const Module = rewire('./inject-data-utils');

describe('Helper: fetchData', () => {
  context('# prepareInitialRender', () => {
    let browserHistoryListen;
    let domNode;
    let routes;
    let props;

    before(() => {
      routes = _.range(4);
      domNode = faker.random.uuid();
      props = faker.random.uuid();
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
      let prepareInitialRenderStub;

      beforeEach(() => {
        navigateToSpy = sinon.spy();
        prepareInitialRenderStub = sinon.stub();
        prepareInitialRenderStub.returns(Promise.resolve(props));

        Module.__Rewire__('navigateTo', navigateToSpy);
        Module.__Rewire__('IsomorphicRouter', {
          prepareInitialRender: prepareInitialRenderStub,
        });
      });

      afterEach(() => {
        Module.__ResetDependency__('navigateTo');
        Module.__ResetDependency__('IsomorphicRouter');
      });

      it('should navigate to error page', () => {
        const match = (route, callback) => {
          callback(true, undefined, undefined);
        };

        Module.__Rewire__('match', match);

        Module.prepareInitialRender(routes, domNode);
        sinon.assert.calledWith(navigateToSpy, '/500.html');

        Module.__ResetDependency__('match');
      });

      it('should redirect to /hello-world.html page', () => {
        const match = (route, callback) => {
          callback(undefined, { pathname: '/hello-world.html', search: '' }, undefined);
        };

        Module.__Rewire__('match', match);

        Module.prepareInitialRender(routes, domNode);
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

        Module.prepareInitialRender(routes, domNode);
        sinon.assert.calledWith(
          prepareInitialRenderStub, Store, renderProps
        );

        Module.__ResetDependency__('match');
      });

      it('should navigate to /404.html page', () => {
        const match = (route, callback) => {
          callback(undefined, undefined, undefined);
        };

        Module.__Rewire__('match', match);

        Module.prepareInitialRender(routes, domNode);
        sinon.assert.calledWith(navigateToSpy, '/404.html');

        Module.__ResetDependency__('match');
      });
    });
  });
});
