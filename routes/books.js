var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// models
const Book = require('../models').Book;
const Loan = require('../models').Loan;

function getCheckedOutBooksQuery() {
    return {
        attributes: ['title', 'author', 'genre', 'first_published', 'id'],
        include: [{
            model: Loan,
            where: { 
                book_id: Sequelize.col('book.id'),
                // book has not been returned yet 
                returned_on: {
                    [Op.eq]: null
                }
            },
            attributes: [['id', 'loan_id']]
        }]
    }
}

function getOverdueBooksQuery() {
    return {
        attributes: ['title', 'author', 'genre', 'first_published', 'id'],
        include: [{
            model: Loan,
            where: { 
                book_id: Sequelize.col('book.id'),
                // less than today's date
                return_by: {
                    [Op.lt]: new Date() 
                },
                // returned_on is null (book has not been returned)
                returned_on: {
                    [Op.eq]: null
                }
            },
            attributes: [['id', 'loan_id']]
        }]
    }
}

/* GET All BOOKS page. */
router.get('/', function(req, res, next) {
    // default query (get all books)
    let query = {};

    if (req.query.filter === 'checked_out') {
        query = getCheckedOutBooksQuery();
    } else if (req.query.filter === 'overdue') {
        query = getOverdueBooksQuery();
    }   

    Book.findAll(query)
        .then((books) => {
            if (books) {
                res.render('books', { books, title: 'Books', filter: req.query.filter });
            } else {
                res.send(404);
            }
        });
});

/* GET Book Detail page (form) */
router.get('/:id/detail', function(req, res, next) {
    res.render('book_detail', { title: 'Book Detail Page' });
});

/* PUT Edit Book */
router.put('/:id', function(req, res, next) {
    // Edit book in db
});
  
/* GET New Book page (form) */
router.get('/new', function(req, res, next) {
    res.render('book_new', { title: 'New Book' });
});

/* POST Create New Book */
router.post('/', function(req, res, next) {
    // CREATE new book in db
});

/* GET Return Book page (form) */
router.get('/:id/return', function(req, res, next) {
    res.render('book_return', { title: 'Patron: Return Book' });
});

/* PUT Update Book */
router.put('/id', function(req, res, next) {
    // UPDATE book in db
});

module.exports = router;
