export const companyTypeDefs = `#graphql
  type Company {
    id: ID
    companyName: String
    email: String
    phoneNumber: String
    city: String
    state: String
    createdAt: String
    updatedAt: String
    userId: ID
  }

  type CompanyId {
    id: ID
  }

  input CompanyInput {
    companyName: String
    email: String
    phoneNumber: String
    city: String
    state: String
    userId: String
  }

  type Query {
    getCompanies: [Company]
    getCompanyBy(query: String!): [Company]
  }

  type Mutation {
    createCompany(company: CompanyInput): CompanyId
  }
`;
