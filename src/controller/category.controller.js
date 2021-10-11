const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'name is required', error: 'missing required field' });

  try {
    const existingCategory = await prisma.category.findFirst({ where: { name } });

    if (existingCategory) {
      return res.status(400).json({ message: 'category already exists', error: 'adding two categories with same name is not allowed' });
    }

    const newCategory = await prisma.category.create({ data: { name } });

    res.json({ message: 'success', data: newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    if (!categories.length) return res.status(404).json({ message: 'no category found', error: 'category list is empty' });

    res.json({ message: 'success', data: categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

module.exports = { addCategory, getCategories };
