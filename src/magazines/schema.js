const MagazineSchema = `
  type Magazine {
    id: ID!
    title: String!
    author: Author!
    category: Category
  }
`;

module.exports = { MagazineSchema };
