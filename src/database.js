const mongoose = require('mongoose');

const CONNECTION_URL = 'mongodb://mongodb-service.graphql-k8s/graphql-example';

const authorSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  books: [{ type: Object }],
  magazines: [{ type: Object }],
});

const bookSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  authors: [{ type: Object }],
  category: { type: Object },
});

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  books: [{ type: Object }],
  magazines: { type: Object },
});

const magazineSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  authors: { type: Object },
  category: { type: Object },
});

const AuthorModel = mongoose.model('Author', authorSchema);
const BookModel = mongoose.model('Book', bookSchema);
const CategoryModel = mongoose.model('Category', categorySchema);
const MagazineModel = mongoose.model('Magazine', magazineSchema);

function connectToDB(URL = CONNECTION_URL) {
  mongoose.connect(URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error'));
}

module.exports = {
  AuthorModel,
  BookModel,
  CategoryModel,
  MagazineModel,
  connectToDB,
};
