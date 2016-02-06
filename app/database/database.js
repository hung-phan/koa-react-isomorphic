import _ from 'lodash';
import faker from 'faker';

export class User {
  constructor() {
    this.id = faker.random.uuid();
    this.name = faker.internet.userName();
  }
}

export const UsersList = _(100)
                          .range()
                          .map(() => new User())
                          .value();

export class Todo {
  constructor() {
    this.id = faker.random.uuid();
    this.user = _.sample(UsersList).id;
    this.text = faker.lorem.sentence();
    this.complete = _.sample([true, false]);
  }
}

export const TodosList = _(100)
                          .range()
                          .map(() => new Todo())
                          .value();

export function getUser(id) {
  return _.find(UsersList, { id });
}

export function getTodo(id) {
  return _.find(TodosList, { id });
}

export function getTodosByUser(user) {
  return _.filter(TodosList, { user });
}
