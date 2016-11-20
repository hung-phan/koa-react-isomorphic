import { assert } from 'chai';
import { fromJS, is } from 'immutable';
import td from 'testdouble';
import nock from 'nock';
import reducer, {
  addTodo,
  removeTodo,
  completeTodo,
  setTodos,
  fetchTodos,
} from './../logic-bundle';

describe('Module: Todos', () => {
  describe('Actions', () => {
    context('fetchTodos', () => {
      const todos = [
        { text: 'Todo 1', complete: false },
        { text: 'Todo 2', complete: false },
        { text: 'Todo 3', complete: false },
        { text: 'Todo 4', complete: false },
      ];
      let RUNTIME_ENV;

      before(() => {
        RUNTIME_ENV = process.env.RUNTIME_ENV;

        process.env.RUNTIME_ENV = 'server';

        nock(`http://localhost:${process.env.PORT}`)
          .get('/api/v1/todos')
          .reply(200, todos);
      });

      after(() => {
        process.env.RUNTIME_ENV = RUNTIME_ENV;
      });

      it("should define 'fetchTodos' function", () => {
        assert.ok(fetchTodos);
        assert.isFunction(fetchTodos);
      });

      it('should return a function when calls "fetchTodos" then return "setTodos" action', async () => {
        const callback = td.function();
        const action = fetchTodos();

        await action(callback);

        td.verify(callback(setTodos(todos)));
      });
    });
  });

  describe('Reducer', () => {
    it('should be a fucntion', () => {
      assert.ok(reducer);
      assert.isFunction(reducer);
    });

    it('should return the default state', () => {
      assert(is(
        reducer(fromJS([]), { type: 'ANOTHER_ACTION', payload: 'random value' }),
        fromJS([])
      ));
    });

    it("should return a todos list with 1 todo item when calls 'addTodo' action", () => {
      assert(is(
        reducer(fromJS([]), addTodo('do chore')),
        fromJS([{ text: 'do chore', complete: false }])
      ));
    });

    it("should return an empty todos list when calls 'removeTodo' action", () => {
      assert(is(
        reducer(fromJS([{ text: 'do chore', complete: false }]), removeTodo(0)),
        fromJS([])
      ));
    });

    it("should return an todos list when calls 'setTodos' action", () => {
      assert(is(
        reducer(fromJS([]), setTodos([{ text: 'do chore', complete: false }])),
        fromJS([{ text: 'do chore', complete: false }])
      ));
    });

    it("should return a todos list with 1 completed todo when calls 'completeTodo' action", () => {
      assert(is(
        reducer(fromJS([{ text: 'do chore', complete: false }]), completeTodo(0)),
        fromJS([{ text: 'do chore', complete: true }])
      ));

      assert(is(
        reducer(fromJS([{ text: 'do chore', complete: true }]), completeTodo(0)),
        fromJS([{ text: 'do chore', complete: false }])
      ));
    });
  });
});
