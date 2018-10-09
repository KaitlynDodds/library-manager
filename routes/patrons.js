var express = require('express');
var router = express.Router();

// models
const Patron        = require('../models').Patron;

// queries
const Query 		= require('../queries/patrons');

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
	const patron_id = req.params.id;
	let query = Query.selectPatronById(patron_id);

	Patron.findOne(query)
		.then(patron => {
			if (patron) {
				console.log(patron);
				res.render('patron_detail', { 
					patron,
					title: `Patron: ${patron.first_name} ${patron.last_name}`
				});
			} else {
				res.sendStatus(404);
			}
		});
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
