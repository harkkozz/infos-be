import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

import { User } from 'entities/User';
import { Company } from 'entities/Company';

interface UserPayload {
  user: User;
}

export const userResolvers = {
  Mutation: {
    login: async (_, { user }: UserPayload) => {
      const userById = await User.findOne({ where: { email: user.email } });
      const matchedPassword = await bcrypt.compare(user.password, userById.password);

      if (userById && userById?.email !== user?.email) {
        throw new GraphQLError('Wrong email or password', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: {
              status: 401
            }
          }
        });
      }

      if (matchedPassword) {
        const token = jwt.sign(
          {
            user: {
              id: userById.id,
              name: userById.name,
              email: userById.email,
              slug: userById.slug
            }
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.TOKEN_EXPIRE,
            algorithm: 'HS512'
          }
        );
        console.log(matchedPassword);

        return {
          message: 'Successfull',
          token
        };
      } else {
        throw new GraphQLError('Wrong email or password', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: {
              status: 401
            }
          }
        });
      }
    },
    signup: async (_, { user }: UserPayload) => {
      const u = new User();
      const hashedPassword = await bcrypt.hash(user.password, 10);

      u.name = user.name;
      u.password = hashedPassword;
      u.email = user.email;

      const data = await u.save();

      return data;
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
  },
  User: {
    companies: async parent => {
      console.log('executed');
      console.log(parent);
      const compsForU = await Company.find({ where: { userId: parent.id } });

      console.log(compsForU);

      return compsForU;
    }
  }
};
