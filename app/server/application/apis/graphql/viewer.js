/* @flow */
import { GraphQLInt, GraphQLObjectType } from "graphql";
import {
  connectionArgs,
  connectionFromArray,
  globalIdField
} from "graphql-relay";
import { nodeInterface, Viewer } from "./interfaces";
import { TodoConnection } from "./todos";
import * as todosDAO from "../../../domain/repositories/TodoDAO";

// https://github.com/facebook/relay/issues/112
export default new GraphQLObjectType({
  name: "Viewer",
  description: "This represents the root query of app",
  isTypeOf: obj => obj === Viewer,
  fields() {
    return {
      id: globalIdField("Viewer"),
      todos: {
        type: TodoConnection,
        args: connectionArgs,
        async resolve(_, args) {
          return connectionFromArray(await todosDAO.all(), args);
        }
      },
      numberOfTodos: {
        type: GraphQLInt,
        resolve() {
          return todosDAO.count();
        }
      }
    };
  },
  interfaces: [nodeInterface]
});
