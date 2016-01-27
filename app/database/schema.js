import _ from 'lodash';

import { UsersList, TodosList } from './database';

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLBoolean,
} from 'graphql';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents user in todos list',
  fields() {
    return {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString }
    };
  }
});

const Todo = new GraphQLObjectType({
  name: 'Todo',
  description: 'This represents todo list',
  fields() {
    return {
      id: { type: new GraphQLNonNull(GraphQLString) },
      user: {
        type: User,
        resolve(todo) {
          return _.find(UsersList, (user) => user.id === todo.user);
        }
      },
      text: { type: GraphQLString },
      complete: { type: GraphQLBoolean }
    };
  }
});

// This is the Root Query
const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: 'Root of the Blog Schema',
  fields: () => ({
    todos: {
      type: new GraphQLList(Todo),
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
