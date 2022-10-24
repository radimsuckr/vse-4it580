export const typeDef = /* GraphQL */ `
  extend type Query {
    books: [Book!]!
    book(id: Int!): Book
    authors: [Author!]!
    author(id: Int!): Author
  }

  type Author {
    id: Int!
    name: String!
    bio: String
    birthYear: Int!
    books: [Book!]!
  }

  type Book {
    id: Int!
    name: String!
    description: String!
    releaseYear: Int!
    isbn: String!
    authors: [Author!]!
  }
`;
