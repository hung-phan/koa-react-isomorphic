import { assert } from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import reducer, {
  addTodo,
  removeTodo,
  completeTodo,
  setTodos,
  fetchTodos,
} from './todos';

describe('Module: Todos', () => {
  describe('Actions', () => {
    context('async', () => {
      const todos = [
        { text: 'Todo 1', complete: false },
        { text: 'Todo 2', complete: false },
        { text: 'Todo 3', complete: false },
        { text: 'Todo 4', complete: false },
      ];
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

  describe('Reducer', () => {
    it('should be a fucntion', () => {
      assert.ok(reducer);
      assert.isFunction(reducer);
    });

    it('should return the default state', () => {
      assert.deepEqual(
        reducer([], { type: 'ANOTHER_ACTION', random: 'random value' }),
        []
      );
    });

    it("should return a todos list with 1 todo item when calls 'addTodo' action", () => {
      assert.deepEqual(
        reducer([], addTodo('do chore')),
        [{ text: 'do chore', complete: false }]
      );
    });

    it("should return an empty todos list when calls 'removeTodo' action", () => {
      assert.deepEqual(
        reducer([{ text: 'do chore', complete: false }], removeTodo(0)),
        []
      );
    });

    it("should return an todos list when calls 'setTodos' action", () => {
      assert.deepEqual(
        reducer([], setTodos([{ text: 'do chore', complete: false }])),
        [{ text: 'do chore', complete: false }]
      );
    });

    it("should return a todos list with 1 completed todo when calls 'completeTodo' action", () => {
      assert.deepEqual(
        reducer([{ text: 'do chore', complete: false }], completeTodo(0)),
        [{ text: 'do chore', complete: true }]
      );

      assert.deepEqual(
        reducer([{ text: 'do chore', complete: true }], completeTodo(0)),
        [{ text: 'do chore', complete: false }]
      );
    });
  });
});
