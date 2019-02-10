const CategorySchema = `
  type Category {
    id: ID!
    name: String!
    books: [Book]
    magazines: [Magazine]
  }
`;

module.exports = { CategorySchema };
