/* @flow */
import DataLoader from "dataloader";
import database from "../../infrastructure/database";
import Todo from "../models/Todo";

type RawTodoType = {
  id: string,
  text: string,
  complete: boolean
};

const dataloader = new DataLoader(
  // $FlowFixMe
  (ids: string[]): Promise<Array<Todo | Error>> => {
    const set: Set<string> = new Set(ids);

    return Promise.resolve(
      database.todos
        .filter(({ id }: RawTodoType) => set.has(id))
        .map(opts => new Todo(opts))
    );
  }
);

export const count = (): number => database.todos.length;

export const all = (): Promise<Todo[]> =>
  Promise.resolve(database.todos.map(opts => new Todo(opts)));

export const getById = (id: string): Promise<Todo> => dataloader.load(id);

export const getByIds = (ids: string[]): Promise<Todo[]> =>
  dataloader.loadMany(ids);
