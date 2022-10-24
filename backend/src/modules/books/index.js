import { typeDef } from './schema';
import * as mutations from './mutation'
import * as queries from './query';

export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Book: {
    async authors({ id }, _args, { dbConnection }) {
      return dbConnection.query(
        `SELECT a.* FROM author_book as ab INNER JOIN author as a ON a.id = ab.author_id WHERE ab.book_id = ?`,
        [id],
      );
    },
  },
  Author: {
    async books({ id }, _args, { dbConnection }) {
      return dbConnection.query(
        `SELECT b.* FROM author_book as ab INNER JOIN book as b ON b.id = ab.book_id WHERE ab.author_id = ?`,
        [id],
      );
    },
  },
};
