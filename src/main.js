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

// 'query { Book(title: "The phoenix") { title, authors { name } } }'
// '{ Book(title: "The phoenix") { id, title, authors { name } } }'
// '{ Book(title: "The phoenix")
// { id, title, authors { name, magazines { title, category { name } } } } }'
// '{ Book(title: "The phoenix") { id, title, authors { name, magazines { title, category { name } } } } }'
// '{ book0: Book(title: "The phoenix") { id, authors { name } } book1: Book(title: "The secret dungeon") { id, authors { name } } }'
// 'mutation { addBook(title: "newbook", authors: [{ id: 0 }]) { id, authors { name } } }',
// 'mutation { book1: addBook(title: "newbook", authors: [{ id: 0 }]) { id, authors { name } }, book2: addBook(title: "newbooki", authors: [{ id: 1 }]) { id, authors { name } } }',