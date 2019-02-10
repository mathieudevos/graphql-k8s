const { CategoryModel } = require('../database');

const getCategories = async () => {
  try {
    const categories = await CategoryModel.find({});
    return categories;
  } catch (error) {
    throw error;
  }
};

const getCategory = async ({ title }) => {
  try {
    const category = await CategoryModel.findOne({ title });
    return category;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async ({ id }) => {
  try {
    const category = await CategoryModel.findOne({ id });
    return category;
  } catch (error) {
    throw error;
  }
};

const addCategory = async ({ name, books, magazines }) => {
  try {
    const category = {
      id: await CategoryModel.count(),
      name,
      books,
      magazines,
    };
    await (new CategoryModel(category)).save();
    return category;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCategories,
  getCategory,
  getCategoryById,
  addCategory,
};
