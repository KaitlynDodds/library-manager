var express = require('express');
var router = express.Router();

/* GET All BOOKS page. */
router.get('/', function(req, res, next) {
    // TODO: Filter by 'all', checked out', 'overdue'
  res.render('index', { title: 'All Books' });
});

/* GET Book Detail page (form) */
router.get('/:id', function(req, res, next) {
    res.render('index', { title: 'Book Detail Page' });
});

/* PUT Edit Book */
router.put('/:id/edit', function(req, res, next) {
    // Edit book in db
});
  
/* GET New Book page (form) */
router.get('/new', function(req, res, next) {
    res.render('index', { title: 'New Book Page' });
});

/* PUSH Create New Book */
router.push('/', function(req, res, next) {
    // CREATE new book in db
});

/* GET Return Book page (form) */
router.get('/return', function(req, res, next) {
    res.render('index', { title: 'Return Book Page' });
});

/* PUT Update Book */
router.put('/', function(req, res, next) {
    // UPDATE book in db
});

module.exports = router;