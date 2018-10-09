var express         = require('express');
var router          = express.Router();
const Sequelize     = require('sequelize');
const Op            = Sequelize.Op;

// models
const Book = require('../models').Book;
const Loan = require('../models').Loan;

// queries 
const Query = require('../queries/books');

/* GET All BOOKS page. */
router.get('/', function(req, res, next) {
    const filter = req.query.filter;
    // default query (get all books)
    let query = {};

    if (filter === 'checked_out') {
        query = Query.selectCheckedOutBooks;
    } else if (filter === 'overdue') {
        query = Query.selectOverdueBooks;
    }   

    Book.findAll(query)
        .then((books) => {
            if (books) {
                res.render('books', { 
                    books, 
                    title: 'Books', 
                    filter: filter 
                });
            } else {
                res.sendStatus(404);
            }
        });
});

/* GET Book Detail page (form) */
router.get('/:id/detail', function(req, res, next) {
    let book_id = req.params.id; 
    let query = Query.selectBookById(book_id);

    Book.findOne(query)
        .then(book => {
            if (book) {
                res.render('book_detail', { 
                    book,
                    title: 'Book Detail Page' 
                });
            } else {
                res.sendStatus(404);
            }
        })
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
