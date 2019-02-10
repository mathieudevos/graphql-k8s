const { database } = require('../database');

const getBooks = () => database.books;
const getBook = ({ title }) => database.books.find(book => book.title === title);
const getBookById = ({ id }) => database.books.find(book => book.id === id);

const addBook = ({ title, authors }) => {
  const newBook = {
    id: database.books.length,
    title,
    authors,
  };
  database.books.push(newBook);
  newBook.id = getBook({ title }).id;
  return newBook;
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  getBookById,
};
