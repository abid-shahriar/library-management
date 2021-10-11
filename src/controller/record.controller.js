const { PrismaClient } = require('@prisma/client');
const { recordSelectOptions } = require('../utils/prisma');

const prisma = new PrismaClient();

const addRecord = async (req, res) => {
  const { bookId, userId } = req.body;

  if (!bookId || !userId) return res.status(400).json({ message: 'bookId and recordId is required', error: 'missing required field' });

  try {
    const newRecord = await prisma.record.create({
      data: { bookId, userId },
      select: recordSelectOptions
    });

    res.json({ message: 'success', data: newRecord });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

const getRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await prisma.record.findFirst({
      where: { id: +id },
      select: recordSelectOptions
    });

    if (!record) return res.status(404).json({ message: 'no record found with the id', error: 'invalid record id' });

    res.json({ message: 'success', data: record });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await prisma.record.findMany({
      select: recordSelectOptions
    });

    if (!records.length) return res.status(404).json({ message: 'no record found', error: 'records table is empty' });

    res.json(records);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

const addReturnDate = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRecord = await prisma.record.update({
      where: {
        id: +id
      },
      data: {
        returnDate: new Date().toISOString()
      },
      select: recordSelectOptions
    });

    res.json({ message: 'success', data: updatedRecord });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

module.exports = { addRecord, getRecordById, getAllRecords, addReturnDate };
