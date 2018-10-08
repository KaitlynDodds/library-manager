var express = require('express');
var router = express.Router();

/* GET All LOANS page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'All Loans' });
});

module.exports = router;
