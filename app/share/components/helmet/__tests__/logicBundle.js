import _ from "lodash";
import faker from "faker";
import reducer, { updateLink, updateTitle } from "../logicBundle";

describe("Module: Helmet", () => {
  describe("Reducer", () => {
    it("should update title when calls 'updateTitle' action", () => {
      const newTitle = faker.random.uuid();

      expect(
        reducer(
          { title: "Koa React Isomorphic", link: [] },
          updateTitle(newTitle)
        )
      ).toEqual({ title: newTitle, link: [] });
    });

    it("should update link when calls 'updateLink' action", () => {
      const newLink = _.range(10).map(() => faker.random.uuid());

      expect(
        reducer(
          { title: "Koa React Isomorphic", link: [] },
          updateLink(newLink)
        )
      ).toEqual({ title: "Koa React Isomorphic", link: newLink });
    });
  });
});
