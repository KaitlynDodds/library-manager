var express = require('express');
var router = express.Router();

/* GET All PATRONS page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'All Patrons' });
});

/* GET Patron Detail page (form) */
router.get('/:id/detail', function(req, res, next) {
    res.render('index', { title: 'Patron Detail Page' });
});

/* PUT Update Patron */
router.put('/:id', function(req, res, next) {
    // UPDATE patron in db
});

/* GET New Patron page (form) */
router.get('/new', function(req, res, next) {
    res.render('index', { title: 'New Patron Page' });
});

/* PUSH Create New Patron */
router.push('/', function(req, res, next) {
    // CREATE new patron in db
});

module.exports = router;
