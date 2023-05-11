import 'dotenvConfig';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from 'db/dataSource';
import { companyResolvers } from 'graphql/Company/resolvers';
import { companyTypeDefs } from 'graphql/Company/typeDefs';
import { userResolvers } from 'graphql/User/resolvers';
import { userTypeDefs } from 'graphql/User/typeDefs';

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
  })
  .catch(error => console.log(error));
