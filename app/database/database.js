import _ from 'lodash';
import faker from 'faker';

export class Todo {
  constructor({ text = faker.lorem.sentence(), complete = _.sample([true, false]) } = {}) {
    this.id = faker.random.uuid();
    this.text = text;
    this.complete = complete;
  }
}

export class Viewer {
  constructor() {
    this.todos = _(100)
                  .range()
                  .map(() => new Todo)
                  .value();
  }
}

export const viewer = new Viewer();

export function getTodo(id) {
  return _.find(viewer.todos, { id });
}
