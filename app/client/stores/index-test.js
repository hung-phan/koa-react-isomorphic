import { assert }     from 'chai';
import configureStore from './index';

describe('App state', () => {
  describe('with empty state', () => {
    const store = configureStore();
    const state = store.getState();

    it('should be defined', () => {
      assert.ok(state);
    });

    it('should define todos property', () => {
      assert.ok(state.todos);
      assert.deepEqual(state.todos, []);
    });
  });

  describe('with given state', () => {
    const store = configureStore({
      todos: [
        { text: 'do chore', complete: true }
      ]
    });
    const state = store.getState();

    it('should be defined', () => {
      assert.ok(state);
    });

    it('should define todos property', () => {
      assert.ok(state.todos);
      assert.deepEqual(state.todos, [
        { text: 'do chore', complete: true }
      ]);
    });
  });
});
