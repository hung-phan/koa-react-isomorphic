import { assert } from 'chai';
import fetchData from './fetch-data';

describe('Helper: fetchData', () => {
  it('should be a function', () => {
    assert.ok(fetchData);
    assert.isFunction(fetchData);
  });

  it('should return a promise', function *() {
    const fakeStore = { todos: [] };
    const fakeRouterState = {
      routes: [
        {
          handler: {
            fetchData(store, params) {
              return Promise.resolve('route 1');
            }
          }
        },
        {
          handler: {
            fetchData(store, params) {
              return Promise.resolve('route 2');
            }
          }
        }
      ],
      params: {
        query: '/'
      }
    };
    const data = yield fetchData(fakeStore, fakeRouterState);
    assert.deepEqual(data, ['route 1', 'route 2']);
  });
});
