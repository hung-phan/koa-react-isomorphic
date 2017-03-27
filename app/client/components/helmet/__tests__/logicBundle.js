import _ from 'lodash';
import faker from 'faker';
import { assert } from 'chai';
import reducer, { updateLink, updateTitle } from '../logicBundle';

describe('Module: Helmet', () => {
  describe('Reducer', () => {
    it('should be a function', () => {
      assert.ok(reducer);
      assert.isFunction(reducer);
    });

    it("should update title when calls 'updateTitle' action", () => {
      const newTitle = faker.random.uuid();

      assert.deepEqual(
        reducer({ title: 'Koa React Isomorphic', link: [] }, updateTitle(newTitle)),
        { title: newTitle, link: [] }
      );
    });

    it("should update link when calls 'updateLink' action", () => {
      const newLink = _.range(10).map(() => faker.random.uuid());

      assert.deepEqual(
        reducer({ title: 'Koa React Isomorphic', link: [] }, updateLink(newLink)),
        { title: 'Koa React Isomorphic', link: newLink }
      );
    });
  });
});
