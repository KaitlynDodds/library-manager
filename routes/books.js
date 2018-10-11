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
        })
        .catch(err => {
			res.sendStatus(500);
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
                    loans: book.Loans,
                    title: 'Book Detail Page' 
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
			res.sendStatus(500);
		});
});

/* PUT Edit Book */
router.put('/:id', function(req, res, next) {

    Book.findById(req.params.id)
        .then(book => {
            if (book) {
                return book.update(req.body);
            } else {
                res.sendStatus(404);
            }
        })
        .then(book => {
            res.redirect('/books');
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                let query = Query.selectBookById(req.params.id);

                Book.findOne(query)
                    .then(book => {
                        if (book) {
                            res.render("book_detail", {
                                // keeps changes made to fields by user
                                book: Object.assign(book, req.body), 
                                loans: book.Loans,
                                title: "Book Detail Page", 
                                errors: err.errors
                            });
                        } else {
                            res.sendStatus(404);
                        }
                    });
            } else {
                throw err;
            }
        })
        .catch(err => {
			res.sendStatus(500);
		});
});
  
/* GET New Book page (form) */
router.get('/new', function(req, res, next) {
    res.render('book_new', { book: Book.build(), title: 'New Book' });
});

/* POST Create New Book */
router.post('/', function(req, res, next) {
    // CREATE new book in db
    Book.create(req.body)
        .then(book => {
            if (book) {
                res.redirect(`/books/${book.id}/detail`);
            } else {
                res.sendStatus(500);
            }
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                res.render("book_new", {
                    book: Book.build(req.body), 
                    title: "New Book", 
                    errors: err.errors
                });
            } else {
                throw err;
            }
        })
        .catch(err => {
			res.sendStatus(500);
		});
});

module.exports = router;
