const { AuthorModel } = require('../database');

const getAuthors = async () => {
  try {
    const authors = await AuthorModel.find({});
    return authors;
  } catch (error) {
    throw error;
  }
};

const getAuthor = async ({ name }) => {
  try {
    const author = await AuthorModel.findOne({ name });
    return author;
  } catch (error) {
    throw error;
  }
};

const getAuthorById = async ({ id }) => {
  try {
    const author = await AuthorModel.findOne({ id });
    return author;
  } catch (error) {
    throw error;
  }
};

const addBookToAuthor = async (id, book) => {
  try {
    await AuthorModel.findOneAndUpdate({ id }, { $push: { books: { id: book.id } } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  getAuthorById,
  addBookToAuthor,
};
