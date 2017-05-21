/* @flow */
import faker from "faker";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import {
  connectionDefinitions,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId
} from "graphql-relay";
import { nodeInterface, Viewer } from "./interfaces";
import ViewerType from "./viewer";
import Todo from "../../../domain/models/Todo";
import * as todosDAO from "../../../domain/repositories/TodoDAO";

export const TodoType = new GraphQLObjectType({
  name: "Todo",
  description: "This represents todo list",
  isTypeOf: obj => obj instanceof Todo,
  fields() {
    return {
      id: globalIdField("Todo"),
      text: { type: GraphQLString },
      complete: { type: GraphQLBoolean }
    };
  },
  interfaces: [nodeInterface]
});

const {
  connectionType: TodoConnection,
  edgeType: GraphQLTodoEdge
} = connectionDefinitions({
  name: "Todo",
  nodeType: TodoType
});

export { TodoConnection, GraphQLTodoEdge };

export const AddTodoMutation = mutationWithClientMutationId({
  name: "AddTodoMutation",
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    todoEdge: {
      type: GraphQLTodoEdge,
      resolve({ todoId }) {
        return todosDAO.getById(todoId).then(todo => ({
          cursor: cursorForObjectInConnection(todosDAO.all(), todo),
          node: todo
        }));
      }
    },
    viewer: {
      type: ViewerType,
      resolve() {
        return Viewer;
      }
    }
  },
  mutateAndGetPayload({ text }) {
    const todo = new Todo(faker.random.uuid(), text, false);
    todosDAO.insert(todo);
    return { todoId: todo.id };
  }
});

export const RemoveTodoMutation = mutationWithClientMutationId({
  name: "RemoveTodoMutation",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    id: {
      type: GraphQLID,
      resolve({ id }) {
        return id;
      }
    },
    viewer: {
      type: ViewerType,
      resolve() {
        return Viewer;
      }
    }
  },
  mutateAndGetPayload({ id }) {
    const { id: todoId } = fromGlobalId(id);

    todosDAO.remove(todoId);

    return { id };
  }
});

export const CompleteTodoMutation = mutationWithClientMutationId({
  name: "CompleteTodoMutation",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    todo: {
      type: TodoType,
      resolve({ todoId }) {
        return todosDAO.getById(todoId);
      }
    },
    viewer: {
      type: ViewerType,
      resolve() {
        return Viewer;
      }
    }
  },
  async mutateAndGetPayload({ id }) {
    const { id: todoId } = fromGlobalId(id);
    const todo = await todosDAO.getById(todoId);

    todo.complete = !todo.complete;
    todosDAO.update(todo);

    return { todoId };
  }
});
