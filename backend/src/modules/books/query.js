export const books = async (_parent, _args, { dbConnection }) => {
  const books = await dbConnection.query(`SELECT * FROM book`);
  return books;
};

export const book = async (_parent, { id }, { dbConnection }) => {
  const book = (await dbConnection.query(`SELECT * FROM book WHERE id = ?`, [id]))[0];
  return book;
};

export const authors = async (_parent, _args, { dbConnection }) => {
  const authors = await dbConnection.query(`SELECT * FROM author`);
  return authors;
};

export const author = async (_parent, { id }, { dbConnection }) => {
  const author = (await dbConnection.query(`SELECT * FROM author WHERE id = ?`, [id]))[0];
  return author;
};
