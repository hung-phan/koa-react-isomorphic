import _ from 'lodash';
import debug from 'debug';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
  GraphQLSchema,
} from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
  cursorForObjectInConnection,
  nodeDefinitions,
  connectionDefinitions,
  globalIdField,
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';
import {
  Todo,
  Viewer,
  viewer,
  getTodo,
} from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case 'Viewer':
        return viewer;
      case 'Todo':
        return getTodo(id);
      default:
        debug('schema')(type, id);
        return undefined;
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

const { connectionType: TodoConnection, edgeType: GraphQLTodoEdge } = connectionDefinitions({
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
      numberOfTodos: {
        type: GraphQLInt,
        resolve() {
          return viewer.todos.length;
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
    todoEdge: {
      type: GraphQLTodoEdge,
      resolve({ todoId }) {
        const todo = getTodo(todoId);
        return {
          cursor: cursorForObjectInConnection(viewer.todos, todo),
          node: todo,
        };
      },
    },
    viewer: {
      type: ViewerType,
      resolve() {
        return viewer;
      },
    },
  },
  mutateAndGetPayload({ text }) {
    const todo = new Todo({ text, complete: false });

    viewer.todos.push(todo);

    return {
      todoId: todo.id,
    };
  },
});

const removeTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodoMutation',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    id: {
      type: GraphQLID,
      resolve({ id }) {
        return id;
      },
    },
    viewer: {
      type: ViewerType,
      resolve() {
        return viewer;
      },
    },
  },
  mutateAndGetPayload({ id }) {
    const { id: todoId } = fromGlobalId(id);
    _.remove(viewer.todos, { id: todoId });

    return { id };
  },
});

const completeTodoMutation = mutationWithClientMutationId({
  name: 'CompleteTodoMutation',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    todo: {
      type: TodoType,
      resolve({ todoId }) {
        return getTodo(todoId);
      },
    },
    viewer: {
      type: ViewerType,
      resolve() {
        return viewer;
      },
    },
  },
  mutateAndGetPayload({ id }) {
    const { id: todoId } = fromGlobalId(id);
    const todo = _.find(viewer.todos, { id: todoId });

    todo.complete = !todo.complete;

    return { todoId };
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields() {
    return {
      addTodo: addTodoMutation,
      removeTodo: removeTodoMutation,
      completeTodo: completeTodoMutation,
    };
  },
});

const Schema = new GraphQLSchema({
  query,
  mutation,
});

export default Schema;
