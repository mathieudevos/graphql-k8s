const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const bodyParser = require('body-parser');
const { readSchema } = require('./schemaReader');
const { resolvers } = require('./resolver');
const { connectToDB } = require('./database');

const AuthorSchema = readSchema('authors/authorSchema.graphql');
const BookSchema = readSchema('books/bookSchema.graphql');
const CategorySchema = readSchema('categories/categorySchema.graphql');
const MagazineSchema = readSchema('magazines/magazineSchema.graphql');
const RootSchema = readSchema('rootSchema.graphql');

const { seedAll } = require('../seeds/seedDatabase');

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

// GraphQL validation using directives (graphql-constraint-directive) @constraint
connectToDB();

const app = express();
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  graphql(
    executableSchema,
    req.body,
  ).then(resp => res.send(JSON.stringify(resp)));
});

app.get('/seed', (req, res) => {
  seedAll();
  res.send('Database seeded!');
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(3000, () => console.log('GraphQL listening.'));
