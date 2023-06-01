import 'dotenvConfig';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from 'db/dataSource';
import { companyResolvers } from 'gql/Company/resolvers';
import { companyTypeDefs } from 'gql/Company/typeDefs';
import { userResolvers } from 'gql/User/resolvers';
import { userTypeDefs } from 'gql/User/typeDefs';

const server = new ApolloServer({
  resolvers: [userResolvers, companyResolvers],
  typeDefs: [userTypeDefs, companyTypeDefs]
});

AppDataSource.initialize()
  .then(async () => {
    // here you can start to work with your database
    console.log('connected');
    const { url } = await startStandaloneServer(server);
    console.log(`Connected to ${url}`);
    console.log(`NODE_ENV = **${process.env.NODE_ENV}**`);
  })
  .catch(error => console.log(error));
