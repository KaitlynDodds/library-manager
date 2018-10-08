var express = require('express');
var router = express.Router();

/* GET All LOANS page. */
router.get('/', function(req, res, next) {
    // TODO: filter by 'all', 'overdue', 'checked out'
  res.render('index', { title: 'All Loans' });
});

/* GET New Loan page (form) */
router.get('/new', function(req, res, next) {
  res.render('index', { title: 'New Loan' });
});

/* PUSH New Loan */
router.push('/', function(req, res, next) {
    // CREATE new loan in db
});

module.exports = router;
