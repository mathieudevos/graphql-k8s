const { database } = require('../database');

const getAuthors = () => database.authors;
const getAuthor = ({ name }) => database.authors.find(author => author.name === name);
const getAuthorById = ({ id }) => database.authors.find(author => author.id === id);

module.exports = {
  getAuthors,
  getAuthor,
  getAuthorById,
};
