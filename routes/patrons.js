var express = require('express');
var router = express.Router();

// models
const Patron        = require('../models').Patron;

/* GET All PATRONS page. */
router.get('/', function(req, res, next) {
	Patron.findAll()
		.then((patrons) => {
			if (patrons) {
				res.render('patrons', { 
					patrons,
					title: 'Patrons'
				});
			} else {
				res.send(404);
			}
		})
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
