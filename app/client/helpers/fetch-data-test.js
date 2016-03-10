import sinon from 'sinon';
import faker from 'faker';
import { assert } from 'chai';
import rewire from 'rewire';

const fetchData = rewire('./fetch-data');

describe('Helper: fetchData', () => {
  it('should be an object', () => {
    assert.isObject(fetchData);
  });

  context('# getComponents', () => {
    it('should return components from routes', () => {
      assert.deepEqual(
        [1, 2, 3, 4],
        fetchData.getComponents({
          routes: [
            { component: 1 },
            { component: 2 },
            { component: 3 },
            { component: 4 },
          ],
        })
      );
    });
  });

  context('# fetchData', () => {
    let getComponents;
    let components;
    let trigger;
    let renderProps;
    let store;

    before(() => {
      components = [1, 2, 3, 4];
      getComponents = sinon.stub();
      getComponents.returns(components);

      trigger = sinon.spy();

      store = faker.random.uuid();
      renderProps = { params: faker.random.uuid() };

      fetchData.__Rewire__('getComponents', getComponents);
      fetchData.__Rewire__('trigger', trigger);

      fetchData.fetchData(renderProps, store);
    });

    after(() => {
      fetchData.__ResetDependency__('getComponents');
      fetchData.__ResetDependency__('trigger');
    });

    it(`should call 'getComponents' with 'renderProps'`, () => {
      sinon.assert.calledWith(getComponents, renderProps);
    });

    it(`should call 'trigger' with 'components' and 'locals'`, () => {
      sinon.assert.calledWith(trigger, 'fetchData', components, {
        store,
        params: renderProps.params,
      });
    });
  });
});
