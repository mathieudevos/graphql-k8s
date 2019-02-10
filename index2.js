#!/usr/local/bin/node

const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs');

const seeds = {
  authors: [
    { id: 0, name: 'Matti Kettu', books: [{ id: 1 }] },
    { id: 1, name: 'Voldemort', books: [{ id: 0 }] },
    { id: 2, name: 'Rambo', books: [{ id: 3 }] },
    { id: 3, name: 'Harry Potter', books: [{ id: 2 }] },
    { id: 4, name: 'Snape', books: [{ id: 2 }] },
  ],
  books: [
    { id: 0, title: 'The secret dungeon', authors: [{ id: 1 }] },
    { id: 1, title: 'GraphQL for Robots', authors: [{ id: 0 }] },
    { id: 2, title: 'The phoenix', authors: [{ id: 3 }, { id: 4 }] },
    { id: 3, title: 'Dumbledore lives', authors: [{ id: 2 }] },
  ],
};

const getAuthors = () => seeds.authors;
const getBooks = () => seeds.books;
const getAuthor = ({ name }) => seeds.authors.find(author => author.name === name);
const getBook = ({ title }) => seeds.books.find(book => book.title === title);
const getAuthorById = ({ id }) => seeds.authors.find(author => author.id === id);
const getBookById = ({ id }) => seeds.books.find(book => book.id === id);

const typeDefs = readFileSync('./schema.graphql', 'utf8');
const typeDefs2 = `
type Query {
  authors: [Author]
  books: [Book]
  Book(title: String!): Book 
  Author(name: String!): Author
}

type Author {
  name: String!
  books: [Book]
}

type Book {
  title: String!
  authors: [Author]
}

schema {
  query: Query
}
`;

console.log(typeDefs);
console.log(typeDefs2);

const resolvers = {
  Query: {
    authors: () => getAuthors(),
    books: () => getBooks(),
    Author(root, args) { return getAuthor(args); },
    Book(root, args) { return getBook(args); },
  },
  Author: {
    books(author) {
      return author.books.map(id => getBookById(id));
    },
  },
  Book: {
    authors(book) {
      return book.authors.map(id => getAuthorById(id));
    },
  },
};

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

graphql(executableSchema, '{ Book(title: "The phoenix") { title, authors { name } } }').then(resp => console.log(JSON.stringify(resp)));
// '{ books { title, authors { name } } }'
// '{ Book(title: "The phoenix") { title, authors { name } } }'
// '{ Book(title: "The phoenix") { title} }'
// '{ books { title, authors { books { title } } } }'
