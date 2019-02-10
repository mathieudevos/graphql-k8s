const BookSchema = `
  type Book {
    id: ID!
    title: String!
    authors: [Author]
    category: Category
  }
`;

module.exports = { BookSchema };
