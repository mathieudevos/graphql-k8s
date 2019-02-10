const { database } = require('../database');

const getMagazines = () => database.magazines;
const getMagazine = ({ name }) => database.magazines.find(magazine => magazine.name === name);
const getMagazineById = ({ id }) => database.magazines.find(magazine => magazine.id === id);

module.exports = {
  getMagazines,
  getMagazine,
  getMagazineById,
};
