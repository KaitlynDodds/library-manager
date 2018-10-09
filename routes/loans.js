var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// models
const Loan = require('../models').Loan;
const Book = require('../models').Book;
const Patron = require('../models').Patron;

function selectAllLoansQuery() {
	return {
		include: [
			{
				model: Book,
				attributes: ['title'],
				where: {
					id: Sequelize.col('loan.book_id')
				}
			},
			{
				model: Patron,
				attributes: ['first_name', 'last_name'],
				where: {
					id: Sequelize.col('loan.patron_id')
				}
			}
		],
	};
}

/* GET All LOANS page. */
router.get('/', function(req, res, next) {
	// default query 
	let query = selectAllLoansQuery();
	
	Loan.findAll(query)
		.then((loans) => {
			if (loans) {
				res.render('loans', { 
					loans, 
					title: 'Loans', 
					filter: req.query.filter 
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
