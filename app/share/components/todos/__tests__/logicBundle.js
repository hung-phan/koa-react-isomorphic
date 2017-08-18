/* global process */
import nock from "nock";
import reducer, {
  addTodo,
  completeTodo,
  fetchTodos,
  removeTodo,
  setTodos
} from "../logicBundle";

describe("Module: Todos", () => {
  describe("Actions", () => {
    describe("fetchTodos", () => {
      const todos = [
        { text: "Todo 1", complete: false },
        { text: "Todo 2", complete: false },
        { text: "Todo 3", complete: false },
        { text: "Todo 4", complete: false }
      ];
      let RUNTIME_ENV;

      beforeAll(() => {
        RUNTIME_ENV = process.env.RUNTIME_ENV;

        process.env.RUNTIME_ENV = "server";

        nock(`http://localhost:${process.env.PORT}`)
          .get("/api/v1/todos")
          .reply(200, todos);
      });

      afterAll(() => {
        process.env.RUNTIME_ENV = RUNTIME_ENV;
      });

      it("should return a function when calls 'fetchTodos' then return 'setTodos' action", async () => {
        const callback = jest.fn();
        const action = fetchTodos();

        await action(callback);

        expect(callback).toBeCalledWith(setTodos(todos));
      });
    });
  });

  describe("Reducer", () => {
    it("should return the default state", () => {
      expect(
        reducer([], { type: "ANOTHER_ACTION", payload: "random value" })
      ).toEqual([]);
    });

    it("should return a todos list with 1 todo item when calls 'addTodo' action", () => {
      expect(reducer([], addTodo("do chore"))).toEqual([
        { text: "do chore", complete: false }
      ]);
    });

    it("should return an empty todos list when calls 'removeTodo' action", () => {
      expect(
        reducer([{ text: "do chore", complete: false }], removeTodo(0))
      ).toEqual([]);
    });

    it("should return an todos list when calls 'setTodos' action", () => {
      expect(
        reducer([], setTodos([{ text: "do chore", complete: false }]))
      ).toEqual([{ text: "do chore", complete: false }]);
    });

    it("should return a todos list with 1 completed todo when calls 'completeTodo' action", () => {
      expect(
        reducer([{ text: "do chore", complete: false }], completeTodo(0))
      ).toEqual([{ text: "do chore", complete: true }]);

      expect(
        reducer([{ text: "do chore", complete: true }], completeTodo(0))
      ).toEqual([{ text: "do chore", complete: false }]);
    });
  });
});
