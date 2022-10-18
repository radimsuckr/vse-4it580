export const typeDef = /* GraphQL */ `
  type Query {
    quacks: [Quack!]!
  }

  type Quack {
    id: Int!
    createdAt: String!
    user: User!
    userId: Int!
    text: String!
  }
`;
