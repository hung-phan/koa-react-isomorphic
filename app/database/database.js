import _ from 'lodash';
import faker from 'faker';

export const UsersList = _(10)
                          .range()
                          .map(() => ({
                            id: faker.random.uuid(),
                            name: faker.internet.userName()
                          }))
                          .value();

export const TodosList = _(100)
                          .range()
                          .map(() => ({
                            id: faker.random.uuid(),
                            user: _.sample(UsersList).id,
                            text: faker.lorem.sentence(),
                            complete: _.sample([true, false])
                          }))
                          .value();
