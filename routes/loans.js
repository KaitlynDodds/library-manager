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
	let loaned_on = new Date(); // get today's date
	
	let return_by = new Date();
	return_by.setDate(return_by.getDate() + 7); // get date 7 days from today

	const data = {};

	Book.findAll()
		.then(books => {
			data.books = books;
			return Patron.findAll();
		})
		.then(patrons => {
			data.patrons = patrons;
			res.render('loan_new', {
				data: data,
				loan: Loan.build({
					loaned_on: loaned_on, 
					return_by: return_by,
				}),
				title: 'New Loan' 
			});
		}).catch(err => {
			throw err;
		});
});

/* POST New Loan */
router.post('/', function(req, res, next) {
	// CREATE new loan in db
	Loan.create(req.body)
		.then(loan => {
			if (loan) {
                res.redirect(`/loans`);
            } else {
                res.sendStatus(500);
            }
		})
		.catch(err => {
			if(err.name === "SequelizeValidationError") {
				data = {};
				Book.findAll()
					.then(books => {
						data.books = books;
						return Patron.findAll();
					})
					.then(patrons => {
						data.patrons = patrons;
						res.render("loan_new", {
							loan: Loan.build(req.body),
							data: data,
							title: "New Loan", 
							errors: err.errors
						});
					}).catch(err => {
						throw err;
					});
            } else {
                throw err;
            }
		}).catch(err => {
			res.sendStatus(500);
		});
});

module.exports = router;
