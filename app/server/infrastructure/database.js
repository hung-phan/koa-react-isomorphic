/* @flow */
import _ from 'lodash';
import faker from 'faker';

export default {
  todos: _.range(10).map(() => ({
    id: faker.random.uuid(),
    text: faker.lorem.sentence(),
    complete: _.sample([true, false]),
  })),
};
