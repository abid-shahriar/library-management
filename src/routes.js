const { Router } = require('express');

const { adminOnly, clerkOnly } = require('./middlewares/cookieAuth.middleware');

const { login } = require('./controller/auth.controller');
const { getAllBooks, addNewBook, deleteBook } = require('./controller/books.controller');
const { getCategories, addCategory } = require('./controller/category.controller');
const { addRecord, getRecordById, getAllRecords, addReturnDate } = require('./controller/record.controller');

const router = Router();

// auth routes
router.post('/login', login);

// book routes
router.get('/books', getAllBooks);
router.post('/book', adminOnly, addNewBook);
router.delete('/book/:id', adminOnly, deleteBook);

// category routes
router.get('/category', getCategories);
router.post('/category', adminOnly, addCategory);

// record routes
router.get('/record', clerkOnly, getAllRecords);
router.get('/record/:id', clerkOnly, getRecordById);
router.post('/record', clerkOnly, addRecord);
router.put('/record/:id/returned', clerkOnly, addReturnDate);

module.exports = router;
