export const userTypeDefs = `#graphql
  type User {
    id: ID
    name: String
    email: String
    createdAt: String
    updatedAt: String
  }

  type PayloadAuthUser {
    token: String!
    message: String
  }

  input LoginUserInput{
    email: String!
    password: String!
  }

  input UserInput {
    name: String
    email: String!
    password: String!
  }

  type Query {
    getUser(id: String): User
  }

  type Mutation {
    signup(user: UserInput): User
    login(user: LoginUserInput): PayloadAuthUser
  }
`;
