export const userTypeDefs = `#graphql
type Company {
    id: ID!
    companyName: String
    email: String
    phoneNumber: String
    city: String
    state: String
    slug: String
    createdAt: String
    updatedAt: String
    userId: ID
  }

  type User {
    id: ID!
    name: String
    email: String
    slug: String
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
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getUser(id: String): User!
    getUserCompanies(id: String): [Company]!
  }

  type Mutation {
    signup(user: UserInput!): User
    login(user: LoginUserInput!): PayloadAuthUser
  }
`;
