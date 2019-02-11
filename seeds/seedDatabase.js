const {
  AuthorModel,
  BookModel,
  CategoryModel,
  MagazineModel,
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
  fs.readdirSync(`${__dirname}/authors`).forEach(async (author) => {
    await addToDatabase(`${__dirname}/authors/${author}`, AuthorModel);
  });
  console.log('Finished seeding authors');
}

function seedBooks() {
  fs.readdirSync(`${__dirname}/books`).forEach(async (book) => {
    await addToDatabase(`${__dirname}/books/${book}`, BookModel);
  });
  console.log('Finished seeding books');
}

function seedCategories() {
  fs.readdirSync(`${__dirname}/categories`).forEach(async (category) => {
    await addToDatabase(`${__dirname}/categories/${category}`, CategoryModel);
  });
  console.log('Finished seeding categories');
}

function seedMagazines() {
  fs.readdirSync(`${__dirname}/magazines`).forEach(async (magazine) => {
    await addToDatabase(`${__dirname}/magazines/${magazine}`, MagazineModel);
  });
  console.log('Finished seeding magazines');
}

function seedAll() {
  console.log(`Dirname: ${__dirname}`);
  seedAuthors();
  seedBooks();
  seedCategories();
  seedMagazines();
}

module.exports = { seedAll };
