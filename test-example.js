#!/usr/local/bin/node
/* eslint-disable */

const { buildSchema, graphql } = require('graphql');

const seeds = {
  authors: [
    { name: 'Myname', books: [{ title: 'GraphQL for Robots' }] },
    { name: 'Voldemort', books: [{ title: 'The secret dungeon' }] },
    { name: 'Rambo', books: [{ title: 'Dumbledore lives' }] },
    { name: 'Harry Potter', books: [{ title: 'The phoenix' }] },
    { name: 'Snape', books: [{ title: 'The phoenix' }] },
  ],
  books: [
    { title: 'The secret dungeon', authors: [{ name: 'Voldemort' }] },
    { title: 'GraphQL for Robots', authors: [{ name: 'Myname' }] },
    { title: 'The phoenix', authors: [{ name: 'Harry Potter' }, { name: 'Snape' }] },
    { title: 'Dumbledore lives', authors: [{ name: 'Rambo' }] },
  ],
};

const getAuthors = () => seeds.authors;
const getBooks = () => seeds.books;
const getAuthor = ({ name }) => seeds.authors.find(author => author.name === name);
const getBook = ({ title }) => seeds.books.find(book => book.title === title);

const schema = buildSchema(`
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
`);

const resolvers = {
  authors: () => getAuthors(),
  books: () => getBooks(),
  Author: name => getAuthor(name),
  Book: title => getBook(title),
};

// graphql(schema, '{ __schema { types { name } } }', resolvers).then(resp => console.log(JSON.stringify(resp)));
// graphql(schema, '{ books { title, authors { name } } }', resolvers).then(resp => console.log(JSON.stringify(resp)));
// graphql(schema, '{ Book(title: "The phoenix") { title, authors { name } } }', resolvers).then(resp => console.log(JSON.stringify(resp)));
// graphql(schema, '{ Book(title: "The phoenix") { title} }', resolvers).then(resp => console.log(JSON.stringify(resp)));
// graphql(schema, '{ books { title, authors { books { title } } } }', resolvers).then(resp => console.log(JSON.stringify(resp)));
// graphql(schema, '{ first_book: Book(title: "The phoenix") { title, authors { name } }, second_book: Book(title: "Dumbledore lives") { title, authors } }', resolvers).then(resp => console.log(JSON.stringify(resp)));
