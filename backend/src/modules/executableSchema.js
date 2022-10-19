import merge from 'lodash.merge';
import { GraphQLError } from 'graphql/error';
import { makeExecutableSchema } from '@graphql-tools/schema';

import mockResolver from '../__mocks__/mockResolver';
import { MOCKS } from '../config/variables';
import { typeDef as Quack, resolvers as quackResolvers } from './quack/index';
import { typeDef as User, resolvers as userResolvers } from './user/index';

const Mutation = /* GraphQL */ `
  type Mutation {
    _empty(nothing: String): String

    addQuack(quackInput: QuackInput!): Quack!

    editQuack(quackEdit: QuackEdit!): Quack!

    deleteQuack(id: Int!): String!
  }

  input QuackInput {
    userId: Int!
    text: String!
  }

  input QuackEdit {
    id: Int!
    text: String!
  }
`;

const resolvers = {
  Mutation: {
    addQuack: async (_, { quackInput }, { dbConnection }) => {
      const { userId, text } = quackInput;

      const createdAt = new Date().toISOString();
      const dbResponse = await dbConnection.query(
        `INSERT INTO quack (id, createdAt, userId, text) VALUES (NULL, ?, ?, ?);`,
        [createdAt, userId, text],
      );

      const quack = (
        await dbConnection.query(`SELECT * FROM quack WHERE id = ? ORDER BY createdAt DESC LIMIT 1`, [
          dbResponse.insertId,
        ])
      )[0];

      return quack;
    },

    editQuack: async (_, { quackEdit: { id, text } }, { dbConnection }) => {
      await dbConnection.query(
        `UPDATE quack SET text = ? WHERE id = ?`,
        [text, id]
      );

      const quack = (
        await dbConnection.query(`SELECT * FROM quack WHERE id = ?`, [id])
      )[0];

      if (!quack) {
        throw new GraphQLError('Quack does not exists!', { extensions: { code: 'DOES_NOT_EXIST' } });
      }

      return quack;
    },

    deleteQuack: async (_, { id }, { dbConnection }) => {
      await dbConnection.query(
        `DELETE FROM quack WHERE id = ?`,
        [id]
      );

      return 'Successful';
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs: [Mutation, Quack, User],
  resolvers: MOCKS
    ? mockResolver
    : merge(resolvers, quackResolvers, userResolvers),
});
