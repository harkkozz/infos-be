import { Company } from 'entities/Company';

export const companyResolvers = {
  Query: {
    getCompanies: async () => {
      const [data] = await Company.findAndCount({
        take: 20,
        skip: 0
      });

      return data;
    },

    getCompanyBy: async (_, args) => {
      const data = await Company.createQueryBuilder('companies')
        .where('LOWER(companies.companyName) like LOWER(:query)')
        .orWhere('LOWER(city) like LOWER(:query)')
        .orWhere('LOWER(state) like LOWER(:query)')
        .setParameter('query', `%${args.query?.toLowerCase()}%`)
        .getMany();

      return data;
    }
  },
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
  }
};
