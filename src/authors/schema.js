const AuthorSchema = `
  type Author {
    id: ID!
    name: String!
    books: [Book]
    magazines: [Magazine]
  }
`;

module.exports = { AuthorSchema };

