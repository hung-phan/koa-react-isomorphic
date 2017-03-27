/* @flow */
import DataLoader from 'dataloader';
import database from '../database';
import Todo from '../../domain/Todo';

type RawTodoType = {
  id: string,
  text: string,
  complete: boolean,
};

const builder = (todo: RawTodoType): Todo =>
  new Todo(todo.id, todo.text, todo.complete);

const dataloader = new DataLoader(
  // $FlowFixMe
  (ids: string[]): Promise<Array<Todo | Error>> => {
    const set: Set<string> = new Set(ids);

    return Promise.resolve(
      database.todos
        .filter(({ id }: RawTodoType) => set.has(id))
        .map(builder)
    );
  }
);

export const count = (): number => database.todos.length;

export const all = (): Promise<Todo[]> => Promise.resolve(database.todos.map(builder));

export const getById = (id: string): Promise<Todo> => dataloader.load(id);

export const getByIds = (ids: string[]): Promise<Todo[]> => dataloader.loadMany(ids);
