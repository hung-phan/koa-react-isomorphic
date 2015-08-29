import { assert }     from 'chai';
import configureStore from './index';

describe('Store', () => {
  describe('with default state', () => {
    let store;
    let state;

    beforeEach(() => {
      store = configureStore();
      state = store.getState();
    });

    it('should define an object with todos property', () => {
      assert.isObject(state);
      assert.property(state, 'todos');
    });

    it('should have an object containing an empty todos array', () => {
      assert.deepEqual(state.todos, []);
    });
  });

  describe('with predefined state', () => {
    let store;
    let state;

    beforeEach(() => {
      store = configureStore({ todos: [{ text: 'do chore', complete: true }]});
      state = store.getState();
    });

    it('should define an object with todos property', () => {
      assert.isObject(state);
      assert.property(state, 'todos');
    });

    it('should have an object containing a predefined todos array', () => {
      assert.deepEqual(state.todos, [{ text: 'do chore', complete: true }]);
    });
  });
});
