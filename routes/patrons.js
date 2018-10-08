var express = require('express');
var router = express.Router();

/* GET All PATRONS page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'All Patrons' });
});

module.exports = router;
