const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { createServer } = require('http');

// const { SubscriptionServer } = require('subscriptions-transport-ws');
const { readSchema } = require('./schemaReader');
const { resolvers } = require('./resolver');
const { connectToDB } = require('./database');

const AuthorSchema = readSchema('authors/authorSchema.graphql');
const BookSchema = readSchema('books/bookSchema.graphql');
const CategorySchema = readSchema('categories/categorySchema.graphql');
const MagazineSchema = readSchema('magazines/magazineSchema.graphql');
const RootSchema = readSchema('rootSchema.graphql');

const { seedAll } = require('../seeds/seedDatabase');

const PORT = 3000;

const executableSchema = makeExecutableSchema({
  typeDefs: [
    RootSchema,
    AuthorSchema,
    BookSchema,
    CategorySchema,
    MagazineSchema,
  ],
  resolvers,
});

connectToDB();

const app = express();

const server = new ApolloServer({ schema: executableSchema });
server.applyMiddleware({ app });

const httpServer = createServer(app);

server.installSubscriptionHandlers(httpServer);

app.get('/', (req, res) => res.send('<h1>Hello world</h1>'));

app.get('/seed', async (req, res) => {
  await seedAll();
  res.send('<h1>Database has been seeded.</h1>');
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
