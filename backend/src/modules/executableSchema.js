import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mockResolver from '../__mocks__/mockResolver';
import { MOCKS } from '../config/variables';
import { typeDef as Quack, resolvers as quackResolvers } from './quack/index';
import { typeDef as User, resolvers as userResolvers } from './user/index';

const Mutation = /* GraphQL */ `
  type Mutation {
    _empty(nothing: String): String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Mutation, Quack, User],
  resolvers: MOCKS
    ? mockResolver
    : merge(resolvers, quackResolvers, userResolvers),
});
