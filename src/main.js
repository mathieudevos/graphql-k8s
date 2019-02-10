#!/usr/local/bin/node

const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { AuthorSchema } = require('./authors/schema');
const { BookSchema } = require('./books/schema');
const { CategorySchema } = require('./categories/schema');
const { MagazineSchema } = require('./magazines/schema');
const { RootSchema } = require('./rootSchema');
const { resolvers } = require('./resolver');


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

graphql(
  executableSchema,
  '{ Book(title: "The phoenix") { id, title, authors { name, magazines { title, category { name } } } } }',
  // 'query { book0: Book(title: "The phoenix") { ...bookFragment } book1: Book(title: "The secret dungeon") { ...bookFragment } } fragment bookFragment on Book { title, authors { name } }',
).then(resp => console.log(JSON.stringify(resp)));

// 'query { Book(title: "The phoenix") { title, authors { name } } }'
// '{ Book(title: "The phoenix") { id, title, authors { name } } }'
// '{ Book(title: "The phoenix")
// { id, title, authors { name, magazines { title, category { name } } } } }'
// '{ Book(title: "The phoenix") { id, title, authors { name, magazines { title, category { name } } } } }'
// '{ book0: Book(title: "The phoenix") { id, authors { name } } book1: Book(title: "The secret dungeon") { id, authors { name } } }'
// 'mutation { addBook(title: "newbook", authors: [{ id: 0 }]) { id, authors { name } } }',
// 'mutation { book1: addBook(title: "newbook", authors: [{ id: 0 }]) { id, authors { name } }, book2: addBook(title: "newbooki", authors: [{ id: 1 }]) { id, authors { name } } }',