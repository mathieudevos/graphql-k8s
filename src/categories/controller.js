const { database } = require('../database');

const getCategories = () => database.categories;
const getCategory = ({ name }) => database.categories.find(category => category.name === name);
const getCategoryById = ({ id }) => database.categories.find(category => category.id === id);

module.exports = {
  getCategories,
  getCategory,
  getCategoryById,
};
