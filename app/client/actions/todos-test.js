import { assert } from 'chai';
import sinon from 'sinon';
import nock from 'nock';

describe('Action: Todos', () => {
  context('sync', () => {
    const { addTodo, removeTodo, completeTodo, setTodos } = require('./todos');

    it("should define 'addTodo' function", () => {
      assert.ok(addTodo);
      assert.isFunction(addTodo);
    });

    it("should define 'removeTodo' function", () => {
      assert.ok(removeTodo);
      assert.isFunction(removeTodo);
    });

    it("should define 'completeTodo' function", () => {
      assert.ok(completeTodo);
      assert.isFunction(completeTodo);
    });

    it("should define 'setTodos' function", () => {
      assert.ok(setTodos);
      assert.isFunction(setTodos);
    });


    it("should return action when calls 'addTodo' with 'do chore'", () => {
      assert.deepEqual(addTodo('do chore'), {
        type: 'ADD_TODO',
        text: 'do chore',
      });
    });

    it("should return action when calls 'removeTodo' with 1", () => {
      const index = 1;
      assert.deepEqual(removeTodo(index), {
        type: 'REMOVE_TODO',
        index,
      });
    });

    it("should return action when calls 'completeTodo' with 1", () => {
      const index = 1;
      assert.deepEqual(completeTodo(index), {
        type: 'COMPLETE_TODO',
        index,
      });
    });

    it("should return action when calls 'setTodos' with todos list", () => {
      const todos = [{ text: 'do chore', complete: false }];

      assert.deepEqual(setTodos(todos), {
        type: 'SET_TODOS',
        todos,
      });
    });
  });

  context('async', () => {
    const todos = [
      { text: 'Todo 1', complete: false },
      { text: 'Todo 2', complete: false },
      { text: 'Todo 3', complete: false },
      { text: 'Todo 4', complete: false },
    ];
    let setTodos;
    let fetchTodos;
    let RUNTIME_ENV;
    let port;

    before(() => {
      RUNTIME_ENV = process.env.RUNTIME_ENV;
      port = process.env.PORT;

      process.env.PORT = 3000;
      process.env.RUNTIME_ENV = 'server';

      nock('http://localhost:3000')
        .get('/api/v1/todos')
        .reply(200, todos);

      fetchTodos = require('./todos').fetchTodos;
      setTodos = require('./todos').setTodos;
    });

    after(() => {
      process.env.RUNTIME_ENV = RUNTIME_ENV;
      process.env.PORT = port;
    });

    it("should define 'fetchTodos' function", () => {
      assert.ok(fetchTodos);
      assert.isFunction(fetchTodos);
    });

    it(`should return a function when calls 'fetchTodos' then return 'setTodos' action`, function *() {
      const callback = sinon.spy();
      const action = fetchTodos();

      yield action(callback);

      sinon.assert.called(callback);
      sinon.assert.calledWith(callback, sinon.match((value) => {
        assert.deepEqual(value, setTodos(todos));

        return true;
      }));
    });
  });
});
