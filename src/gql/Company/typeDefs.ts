export const companyTypeDefs = `#graphql
  type Company {
    id: ID!
    companyName: String!
    email: String!
    areaCode: String!
    phoneNumber: String!
    city: String!
    state: String!
    slug: String
    createdAt: String
    updatedAt: String
    userId: ID
  }

  input CompanyInput {
    companyName: String!
    email: String!
    areaCode: String!
    phoneNumber: String!
    city: String!
    state: String!
    userId: String!
  }

  type Query {
    getCompanies: [Company]!
    searchCompany(query: String!): [Company]!
    getCompanyById(id: String!): Company!
  }

  type Mutation {
    createCompany(company: CompanyInput!): Company!
    editCompany(id: String!, company: CompanyInput!): Company!
  }
`;
