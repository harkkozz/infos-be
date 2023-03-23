import { Company } from 'entities/Company';

export const companyResolvers = {
  Mutation: {
    createCompany: async (_, { company }) => {
      const { raw } = await Company.createQueryBuilder()
        .insert()
        .into(Company)
        .values(company)
        .execute();

      const [companyId] = raw;

      return companyId;
    }
  },
  Query: {}
};
