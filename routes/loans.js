var express 		= require('express');
var router 			= express.Router();
const Sequelize 	= require('sequelize');
const Op 			= Sequelize.Op;

// models
const Loan 		= require('../models').Loan;
const Book 		= require('../models').Book;
const Patron 	= require('../models').Patron;

// Queries
const Query 	= require('../queries/loans');

/* GET All LOANS page. */
router.get('/', function(req, res, next) {
	const filter = req.query.filter;
	// default query 
	let query = Query.selectAllLoans;
	if (filter === 'overdue') {
		query = Query.selectOverdueLoans;
	} else if (filter === 'checked_out') {
		query = Query.selectCheckedOutLoans;
	}
	
	Loan.findAll(query)
		.then((loans) => {
			if (loans) {
				res.render('loans', { 
					loans, 
					title: 'Loans', 
					filter: filter 
				});
			} else {
				send(404);
			}
		})
});

/* GET New Loan page (form) */
router.get('/new', function(req, res, next) {
	res.render('loan_new', { title: 'New Loan' });
});

/* POST New Loan */
router.post('/', function(req, res, next) {
		// CREATE new loan in db
});

module.exports = router;
