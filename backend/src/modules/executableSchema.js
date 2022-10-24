import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mockResolver from '../__mocks__/mockResolver';
import { MOCKS } from '../config/variables';
import { typeDef as Quack, resolvers as quackResolvers } from './quack/index';
import { typeDef as User, resolvers as userResolvers } from './user/index';
import { typeDef as Books, resolvers as booksResolvers } from './books/index';

const Query = /* GraphQL */ `
  type Query {
    _empty: String
  }
`;

const Mutation = /* GraphQL */ `
  type Mutation {
    _empty(nothing: String): String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Quack, User, Books],
  resolvers: MOCKS === "true"
    ? merge(mockResolver, booksResolvers)
    : merge(resolvers, quackResolvers, userResolvers, booksResolvers),
});
