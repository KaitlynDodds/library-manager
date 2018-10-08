var express = require('express');
var router = express.Router();

/* GET All PATRONS page. */
router.get('/', function(req, res, next) {
  res.render('patrons', { title: 'Patrons' });
});

/* GET Patron Detail page (form) */
router.get('/:id/detail', function(req, res, next) {
    res.render('patron_detail', { title: 'Patron: {Patron Name}' });
});

/* PUT Update Patron */
router.put('/:id', function(req, res, next) {
    // UPDATE patron in db
});

/* GET New Patron page (form) */
router.get('/new', function(req, res, next) {
    res.render('patron_new', { title: 'New Patron' });
});

/* POST Create New Patron */
router.post('/', function(req, res, next) {
    // CREATE new patron in db
});

module.exports = router;
