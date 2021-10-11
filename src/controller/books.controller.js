const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        name: true,
        year: true,
        author: true,
        category: true
      }
    });

    if (!books.length) return res.status(404).json({ message: 'no book found', error: 'books list is empty' });

    res.json({ message: 'success', data: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

const addNewBook = async (req, res) => {
  const { name, year, author, categoryId } = req.body;

  if (!name || !year || !author || !categoryId) {
    return res.status(400).json({ message: 'name, year, author and categoryId are required', error: 'missing required field' });
  }

  try {
    const newBook = await prisma.book.create({ data: { name, year, author, categoryId } });

    res.json({ message: 'success', data: newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await prisma.book.delete({ where: { id: +id } });

    res.json({ message: 'book deleted', data: deletedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

module.exports = { getAllBooks, addNewBook, deleteBook };
