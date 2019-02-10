const database = {
  authors: [
    {
      id: 0,
      name: 'Matti Kettu',
      books: [{ id: 1 }],
      magazines: [{ id: 1 }],
    },
    {
      id: 1,
      name: 'Voldemort',
      books: [{ id: 0 }],
      magazines: [],
    },
    {
      id: 2,
      name: 'Rambo',
      books: [{ id: 3 }],
      magazines: [],
    },
    {
      id: 3,
      name: 'Harry Potter',
      books: [{ id: 2 }],
      magazines: [],
    },
    {
      id: 4,
      name: 'Snape',
      books: [{ id: 2 }],
      magazines: [{ id: 0 }],
    },
  ],
  books: [
    {
      id: 0,
      title: 'The secret dungeon',
      authors: [{ id: 1 }],
      category: { id: 0 },
    },
    {
      id: 1,
      title: 'GraphQL for Robots',
      authors: [{ id: 0 }],
      category: { id: 1 },
    },
    {
      id: 2,
      title: 'The phoenix',
      authors: [{ id: 3 }, { id: 4 }],
      category: { id: 0 },
    },
    {
      id: 3,
      title: 'Dumbledore lives',
      authors: [{ id: 2 }],
      category: { id: 0 },
    },
  ],
  magazines: [
    {
      id: 0,
      title: 'Wizardery Monthly',
      author: { id: 4 },
      category: { id: 0 },
    },
    {
      id: 1,
      title: 'Weekly Whining about GraphQL',
      author: { id: 0 },
      category: { id: 1 },
    },
  ],
  categories: [
    {
      id: 0,
      name: 'Magic',
      books: [{ id: 0 }, { id: 1 }, { id: 3 }],
      magazines: [{ id: 0 }],
    },
    {
      id: 1,
      name: 'API',
      books: [{ id: 1 }],
      magazines: [{ id: 1 }],
    },
  ],
};

module.exports = { database };
