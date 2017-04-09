/* @flow */
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { nodeField, Viewer } from "./graphql/interfaces";
import {
  AddTodoMutation,
  CompleteTodoMutation,
  RemoveTodoMutation
} from "./graphql/todos";
import ViewerType from "./graphql/viewer";

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "Root of the Blog Schema",
    fields: () => ({
      node: nodeField,
      viewer: {
        type: ViewerType,
        resolve() {
          return Viewer;
        }
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields() {
      return {
        addTodo: AddTodoMutation,
        removeTodo: RemoveTodoMutation,
        completeTodo: CompleteTodoMutation
      };
    }
  })
});
