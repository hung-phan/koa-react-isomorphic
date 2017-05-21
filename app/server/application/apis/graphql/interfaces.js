/* @flow */
import debug from "debug";
import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import * as todosDAO from "../../../domain/repositories/TodoDAO";

export const Viewer = Symbol("Viewer");

const { nodeInterface, nodeField } = nodeDefinitions(globalId => {
  const { type, id } = fromGlobalId(globalId);

  switch (type) {
    case "Viewer":
      return Viewer;
    case "Todo":
      return todosDAO.getById(id);
    default:
      debug("schema")(type, id);
      return undefined;
  }
});

export { nodeInterface, nodeField };
