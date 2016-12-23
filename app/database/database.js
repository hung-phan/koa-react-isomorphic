// @flow
import _ from 'lodash';
import faker from 'faker';
import DataLoader from 'dataloader';

export class Todo {
  id: string;
  text: string;
  complete: boolean;

  constructor({
    text = faker.lorem.sentence(),
    complete = _.sample([true, false])
  }: { text: string, complete: boolean } = {}) {
    this.id = faker.random.uuid();
    this.text = text;
    this.complete = complete;
  }
}

export class TodosDAO {
  data: Todo[];
  dataloader: DataLoader;

  constructor() {
    this.data =
      _(100)
        .range()
        .map(() => new Todo())
        .value();

    this.dataloader = new DataLoader((ids: string[]): Promise<Todo[]> => this.getByIds(ids));
  }

  count(): number {
    return this.data.length;
  }

  all(): Todo[] {
    return this.data;
  }

  getByIds(ids: string[]): Promise<Todo[]> {
    const set: Set<string> = new Set(ids);

    return Promise.resolve(
      _.filter(this.data, (todo: Todo) => set.has(todo.id))
    );
  }

  get(id: string): Promise<Todo> {
    return this.dataloader.load(id);
  }

  insert(todo: Todo): void {
    this.data.push(todo);
  }

  remove(id: string): void {
    _.remove(this.data, { id });
  }
}

export const todosDao = new TodosDAO();
