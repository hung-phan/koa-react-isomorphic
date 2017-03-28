/* @flow */
import DataLoader from 'dataloader';
import database from '../database';
import Todo from '../../domain/Todo';

type RawTodoType = {
  id: string,
  text: string,
  complete: boolean,
};

let data = database.todos;

const builder = (todo: RawTodoType): Todo =>
  new Todo(todo.id, todo.text, todo.complete);

const dataloader = new DataLoader(
  // $FlowFixMe
  (ids: string[]): Promise<Array<Todo | Error>> => {
    const set: Set<string> = new Set(ids);

    return Promise.resolve(
      data
        .filter(({ id }: RawTodoType) => set.has(id))
        .map(builder)
    );
  }
);

export const count = (): number => data.length;

export const all = (): Promise<Todo[]> => Promise.resolve(data.map(builder));

export const getById = (id: string): Promise<Todo> => dataloader.load(id);

export const getByIds = (ids: string[]): Promise<Todo[]> => dataloader.loadMany(ids);

export const insert = (todo: Todo) => {
  data.push({ id: todo.id, text: todo.text, complete: todo.complete });
};

export const remove = (id: string) => {
  data = data.filter((_todo: RawTodoType) => _todo.id !== id);
};

export const update = (todo: Todo) => {
  const todoObj = data.find((_todo: RawTodoType) => _todo.id === todo.id);

  if (todoObj) {
    Object.assign(todoObj, {
      text: todo.text,
      complete: todo.complete,
    });
  }
};
