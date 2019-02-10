const RootSchema = `
  input AuthorRef {
    id: Int!
  }

  type Query {
    authors: [Author]
    books: [Book]
    categories: [Category]
    magazines: [Magazine]
    Book(title: String!): Book 
    Author(name: String!): Author
    Category(name: String!): Category
    Magazine(title: String!): Magazine
  }

  type Mutation {
    addBook(title: String!, authors: [AuthorRef]): Book
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = { RootSchema };
