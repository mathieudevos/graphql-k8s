const {
  AuthorModel,
  BookModel,
  CategoryModel,
  MagazineModel,
  connectToDB,
} = require('../src/database');
const fs = require('fs');

async function addToDatabase(filepath, Model) {
  try {
    await (new Model(JSON.parse(fs.readFileSync(filepath)))).save();
  } catch (error) {
    throw error;
  }
}

function seedAuthors() {
  fs.readdirSync('./authors').forEach((author) => {
    addToDatabase(`./authors/${author}`, AuthorModel);
  });
  console.log('Finished seeding authors');
}

function seedBooks() {
  fs.readdirSync('./books').forEach((book) => {
    addToDatabase(`./books/${book}`, BookModel);
  });
  console.log('Finished seeding books');
}

function seedCategories() {
  fs.readdirSync('./categories').forEach((category) => {
    addToDatabase(`./categories/${category}`, CategoryModel);
  });
  console.log('Finished seeding categories');
}

function seedMagazines() {
  fs.readdirSync('./magazines').forEach((magazine) => {
    addToDatabase(`./magazines/${magazine}`, MagazineModel);
  });
  console.log('Finished seeding magazines');
}

connectToDB();
seedAuthors();
seedBooks();
seedCategories();
seedMagazines();
