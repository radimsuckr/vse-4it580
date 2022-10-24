export const typeDef = /* GraphQL */ `
  extend type Query {
    books: [Book!]!
    book(id: Int!): Book
    authors: [Author!]!
    author(id: Int!): Author
  }

  extend type Mutation {
    createBook(input: CreateBook!): Book!
    updateBook(input: UpdateBook!): Book!
    deleteBook(input: DeleteBook!): Boolean!

    createAuthor(input: CreateAuthor!): Author!
    updateAuthor(input: UpdateAuthor!): Author!
    deleteAuthor(input: DeleteAuthor!): Boolean!

    createAuthorBookRelation(input: CreateAuthorBookRelation!): Boolean!
    deleteAuthorBookRelation(input: DeleteAuthorBookRelation!): Boolean!
  }

  input CreateAuthorBookRelation {
    book_id: Int!
    author_id: Int!
  }

  input DeleteAuthorBookRelation {
    book_id: Int!
    author_id: Int!
  }

  input CreateAuthor {
    name: String!
    bio: String
    birthYear: Int!
  }

  input CreateBook {
    name: String!
    description: String!
    releaseYear: Int!
    isbn: String!
  }

  input DeleteBook {
    id: Int!
  }

  input DeleteAuthor {
    id: Int!
  }

  input UpdateBook {
    id: Int!
    name: String
    description: String
    releaseYear: Int
    isbn: String
  }

  input UpdateAuthor {
    id: Int!
    name: String
    bio: String
    birthYear: Int
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
