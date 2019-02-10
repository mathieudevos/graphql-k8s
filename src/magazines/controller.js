const { MagazineModel } = require('../database');

const getMagazines = async () => {
  try {
    const magazines = await MagazineModel.find({});
    return magazines;
  } catch (error) {
    throw error;
  }
};

const getMagazine = async ({ title }) => {
  try {
    const magazine = await MagazineModel.findOne({ title });
    return magazine;
  } catch (error) {
    throw error;
  }
};

const getMagazineById = async ({ id }) => {
  try {
    const magazine = await MagazineModel.findOne({ id });
    return magazine;
  } catch (error) {
    throw error;
  }
};

const addMagazine = async ({ title, author, category }) => {
  try {
    const magazine = {
      id: await MagazineModel.count(),
      title,
      author,
      category,
    };
    await (new MagazineModel(magazine)).save();
    return magazine;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMagazines,
  getMagazine,
  getMagazineById,
  addMagazine,
};
