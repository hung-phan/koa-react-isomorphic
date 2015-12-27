import { assert } from 'chai';

describe('Store', () => {
  context('with default state in development', () => {
    let store;
    let state;
    let configureStore;

    before(() => {
      process.env.NODE_ENV = 'development';
      configureStore = require('./index').default;
    });
    after(() => {
      process.env.NODE_ENV = 'test';
    });

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

  context('with default state in production', () => {
    let store;
    let state;
    let configureStore;

    before(() => {
      process.env.NODE_ENV = 'production';
      configureStore = require('./index').default;
    });
    after(() => {
      process.env.NODE_ENV = 'test';
    });

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

  context('with predefined state in development', () => {
    let store;
    let state;
    let configureStore;

    before(() => {
      process.env.NODE_ENV = 'development';
      configureStore = require('./index').default;
    });
    after(() => {
      process.env.NODE_ENV = 'test';
    });

    beforeEach(() => {
      store = configureStore({ todos: [{ text: 'do chore', complete: true }] });
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

  context('with predefined state in production', () => {
    let store;
    let state;
    let configureStore;

    before(() => {
      process.env.NODE_ENV = 'production';
      configureStore = require('./index').default;
    });
    after(() => {
      process.env.NODE_ENV = 'test';
    });

    beforeEach(() => {
      store = configureStore({ todos: [{ text: 'do chore', complete: true }] });
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
