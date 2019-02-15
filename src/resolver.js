const {
  getAuthor,
  getAuthorById,
  getAuthors,
} = require('./authors/controller');
const {
  getBook,
  getBookById,
  getBooks,
  addBook,
} = require('./books/controller');
const {
  getMagazine,
  getMagazineById,
  getMagazines,
} = require('./magazines/controller');
const {
  getCategories,
  getCategory,
  getCategoryById,
} = require('./categories/controller');
const { pubsub } = require('./pubsub');

const resolvers = {
  Query: {
    authors: () => getAuthors(),
    books: () => getBooks(),
    categories: () => getCategories(),
    magazines: () => getMagazines(),
    Author(root, args) { return getAuthor(args); },
    Book(root, args) { return getBook(args); },
    Category(root, args) { return getCategory(args); },
    Magazine(root, args) { return getMagazine(args); },
  },
  Mutation: {
    addBook(root, args) { return addBook(args); },
  },
  Subscription: {
    bookWatcher: {
      subscribe: () => pubsub.asyncIterator('bookWatcher'),
    },
  },
  Author: {
    books(author) { return author.books.map(id => getBookById(id)); },
    magazines(author) { return author.magazines.map(id => getMagazineById(id)); },
  },
  Book: {
    authors(book) { return book.authors.map(id => getAuthorById(id)); },
    category(book) { return getCategoryById(book.category); },
  },
  Category: {
    books(category) { return category.books.map(id => getBookById(id)); },
    magazines(category) { return category.magazines.map(id => getMagazineById(id)); },
  },
  Magazine: {
    author(magazine) { return getAuthorById(magazine.author); },
    category(magazine) { return getCategoryById(magazine.category); },
  },
};

module.exports = { resolvers };
