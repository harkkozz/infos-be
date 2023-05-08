import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import { User } from 'entities/User';

export const userResolvers = {
  Mutation: {
    login: async (_, { user }) => {
      const userById = await User.findOne({ where: { email: user.email } });
      const matchedPassword = await bcrypt.compare(user.password, userById.password);

      if (matchedPassword) {
        const token = jwt.sign(
          { user: { id: userById.id, name: userById.name, email: userById.email } },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.TOKEN_EXPIRE,
            algorithm: 'HS512'
          }
        );

        return {
          message: 'Successfull',
          token
        };
      }

      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }
        }
      });
    },
    signup: async (_, { user }) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const { raw } = await User.createQueryBuilder()
        .insert()
        .into(User)
        .values({ ...user, password: hashedPassword })
        .execute();

      return await User.findOne({ where: { id: raw[0].id } });
    }
  },
  Query: {
    getUser: async (_, user: User) => await User.findOne({ where: { id: user.id } }),
    getUserCompanies: async (_, user: User) => {
      const { companies } = await User.findOne({
        where: { id: user.id },
        relations: {
          companies: true
        }
      });

      return companies;
    }
  }
};
