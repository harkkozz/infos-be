import { Company } from 'entities/Company';

interface CompanyPayload {
  company: Company;
}

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
    createCompany: async (_, { company }: CompanyPayload) => {
      const c = new Company();

      c.companyName = company.companyName;
      c.city = company.city;
      c.state = company.state;
      c.email = company.email;
      c.phoneNumber = company.phoneNumber;
      c.userId = company.userId;

      const data = await c.save();

      return { ...data };
    }
  }
};
