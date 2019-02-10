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

const addAuthor = async ({ name, books, magazines }) => {
  try {
    const author = {
      id: await AuthorModel.count(),
      name,
      books,
      magazines,
    };
    await (new AuthorModel(author)).save();
    return author;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  getAuthorById,
  addAuthor,
};
