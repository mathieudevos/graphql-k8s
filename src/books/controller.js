const { BookModel } = require('../database');

const getBooks = async () => {
  try {
    const books = await BookModel.find({});
    return books;
  } catch (error) {
    throw error;
  }
};

const getBook = async ({ title }) => {
  try {
    const book = await BookModel.findOne({ title });
    return book;
  } catch (error) {
    throw error;
  }
};

const getBookById = async ({ id }) => {
  try {
    const book = await BookModel.findOne({ id });
    return book;
  } catch (error) {
    throw error;
  }
};

const addBook = async ({ title, authors, category }) => {
  try {
    const book = {
      id: await BookModel.count(),
      title,
      authors,
      category,
    };
    await (new BookModel(book)).save();
    return book;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBooks,
  getBook,
  getBookById,
  addBook,
};
