import {
  Todo,
  Viewer,
  TodosList,
  viewer,
  getTodo,
} from './database';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
  nodeDefinitions,
  connectionDefinitions,
  globalIdField,
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case 'Todo':
        return getTodo(id);
      default:
        // do nothing
    }
  }
);

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'This represents todo list',
  isTypeOf: (obj) => obj instanceof Todo,
  fields() {
    return {
      id: globalIdField('Todo'),
      text: { type: GraphQLString },
      complete: { type: GraphQLBoolean },
    };
  },
  interfaces: [nodeInterface],
});

const { connectionType: TodoConnection } = connectionDefinitions({
  name: 'Todo',
  nodeType: TodoType,
});

// https://github.com/facebook/relay/issues/112
const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'This represents the root query of app',
  isTypeOf: (obj) => obj instanceof Viewer,
  fields() {
    return {
      id: globalIdField('Viewer'),
      todos: {
        type: TodoConnection,
        args: connectionArgs,
        resolve({ todos }, args) {
          return connectionFromArray(todos, args);
        },
      },
    };
  },
  interfaces: [nodeInterface],
});

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: ViewerType,
      resolve() {
        return viewer;
      },
    },
  }),
});

const addTodoMutation = mutationWithClientMutationId({
  name: 'AddTodoMutation',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    todo: {
      type: TodoType,
      resolve({ todoId }) {
        return getTodo(todoId);
      },
    },
  },
  mutateAndGetPayload({ text }) {
    const todo = new Todo({ text, complete: false });

    TodosList.push(todo);

    return {
      todoId: todo.id,
    };
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields() {
    return {
      addTodoMutation,
    };
  },
});

const Schema = new GraphQLSchema({
  query,
  mutation,
});

export default Schema;
