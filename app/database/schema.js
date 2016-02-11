import {
  User,
  Todo,
  UsersList,
  TodosList,
  getUser,
  getTodo,
  getTodosByUser,
} from './database';
import {
  GraphQLString,
  GraphQLList,
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

    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Todo') {
      return getTodo(id);
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

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents user in todos list',
  isTypeOf: (obj) => obj instanceof User,
  fields() {
    return {
      id: globalIdField('User'),
      name: { type: GraphQLString },
      todos: {
        type: connectionDefinitions({ name: 'Todo', nodeType: TodoType }).connectionType,
        args: connectionArgs,
        resolve({ id }, args) {
          return connectionFromArray(getTodosByUser(id), args);
        },
      },
    };
  },
  interfaces: [nodeInterface],
});

const addTodoMutation = mutationWithClientMutationId({
  name: 'AddTodoMutation',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve({ userId }) {
        return getUser(userId);
      },
    },
    todo: {
      type: TodoType,
      resolve({ todoId }) {
        return getTodo(todoId);
      },
    },
  },
  mutateAndGetPayload({ text, user }) {
    const todo = Object.assign(new Todo, {
      text,
      user,
    });

    TodosList.push(todo);

    return {
      todoId: todo.id,
      userId: user,
    };
  },
});

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
    node: nodeField,
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return TodosList;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return UsersList;
      },
    },
  }),
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
