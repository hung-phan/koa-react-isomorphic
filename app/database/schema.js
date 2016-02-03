import { User, Todo, UsersList, TodosList, getUser, getTodo } from './database';
import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
} from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
  nodeDefinitions,
  connectionDefinitions,
  globalIdField,
  fromGlobalId
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

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents user in todos list',
  isTypeOf: (obj) => obj instanceof User,
  fields() {
    return {
      id: globalIdField('User'),
      name: { type: GraphQLString }
    };
  },
  interfaces: [nodeInterface]
});

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'This represents todo list',
  isTypeOf: (obj) => obj instanceof Todo,
  fields() {
    return {
      id: globalIdField('Todo'),
      user: {
        type: connectionDefinitions({ name: 'User', nodeType: UserType }).connectionType,
        args: connectionArgs,
        resolve: (__, args) => connectionFromArray(UsersList, args),
      },
      text: { type: GraphQLString },
      complete: { type: GraphQLBoolean }
    };
  },
  interfaces: [nodeInterface]
});

// This is the Root Query
const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: 'Root of the Blog Schema',
  fields: () => ({
    node: nodeField,
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return TodosList;
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
