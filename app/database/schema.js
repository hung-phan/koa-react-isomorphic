import _ from 'lodash';

// This is the Dataset in our blog
import { PostsList, AuthorsList } from './database';

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} from 'graphql';

const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent an author',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString }
  })
});

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represent a Post',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    author: {
      type: Author,
      resolve(post) {
        return _.find(AuthorsList, a => a._id === post.author);
      }
    }
  })
});

// This is the Root Query
const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: 'Root of the Blog Schema',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      resolve() {
        return PostsList;
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
