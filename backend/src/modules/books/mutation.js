export const createBook = async (_parent, { input: book }, { dbConnection }) => {
  const query = await dbConnection.query(
    'INSERT INTO book (name, description, releaseYear, isbn) VALUES (?, ?, ?, ?))',
    [book.name, book.description, book.releaseYear, book.isbn],
  );

  if (query.affectedRows !== 1) {
    throw new Error('Error creating a new book');
  }

  return book(undefined, { id: query.insertId }, { dbConnection });
}

export const updateBook = async (_parent, { input: { id, ...rest } }, { dbConnection }) => {
  const book = (await dbConnection.query('SELECT * FROM book WHERE id = ?', [id]))[0];
  if (!book) {
    throw new Error('No book with ID ' + id);
  }

  const query = await dbConnection.query(
    'UPDATE book SET name = ?, description = ?, releaseYear = ?, isbn = ? WHERE id = ?',
    [rest.name, rest.description, rest.releaseYear, rest.isbn, id],
  );

  if (query.affectedRows !== 1) {
    throw new Error('Error updateing a book');
  }

  return book(undefined, { id }, { dbConnection });
}

export const deleteBook = async (_parent, { input: { id } }, { dbConnection }) => {
  const query = await dbConnection.query(
    'DELETE FROM book WHERE id = ?',
    [id],
  );

  if (query.affectedRows !== 1) {
    throw new Error('Error deleting a book with ID ' + id);
  }

  return true;
}

export const createAuthor = async (_parent, { input: author }, { dbConnection }) => {
  const query = await dbConnection.query(
    'INSERT INTO author (name, bio, birthYear) VALUES (?, ?, ?)',
    [author.name, author.bio, author.birthYear],
  );
  if (query.affectedRows !== 1) {
    throw new Error('Error creating an author');
  }

  return author(undefined, { id: query.insertId }, { dbConnection });
}

export const updateAuthor = async (_parent, { input: { id, ...rest } }, { dbConnection }) => {
  const author = (await dbConnection.query('SELECT * FROM author WHERE id = ?', [id]))[0];
  if (!author) {
    throw new Error('No author with ID ' + id);
  }

  const query = await dbConnection.query(
    'UPDATE author SET name = ?, bio = ?, birthYear = ? WHERE id = ?',
    [rest.name, rest.bio, rest.birthYear, id],
  );
  if (query.affectedRows !== 1) {
    throw new Error('Error updating an author');
  }

  return author(undefined, { id }, { dbConnection });
}

export const deleteAuthor = async (_parent, { input: { id } }, { dbConnection }) => {
  const query = await dbConnection.query('DELETE FROM author WHERE id = ?', [id]);
  if (query.affectedRows !== 1) {
    throw new Error('Error deleting an author with ID' + id);
  }

  return true;
}

export const createAuthorBookRelation = async (_parent, { input: data }, { dbConnection }) => {
  const query = await dbConnection.query(
    'INSERT INTO author_book (author_id, book_id) VALUES (?, ?)',
    [data.author_id, data.book_id],
  );
  if (query.affectedRows !== 1) {
    throw new Error('Error creating a relation between author with ID ' + data.author_id + ' and book with ID ' + data.book_id);
  }

  return true;
}

export const deleteAuthorBookRelation = async (_parent, { input: { book_id, author_id } }, { dbConnection }) => {
  const query = await dbConnection.query(
    'DELETE FROM author_book WHERE book_id = ? AND author_id = ?',
    [book_id, author_id],
  );
  if (query.affectedRows !== 1) {
    throw new Error('Error deleting a relation between an author with ID ' + author_id + ' and a book with ID ' + book_id);
  }

  return true;
}
