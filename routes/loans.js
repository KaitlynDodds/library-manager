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
	const LIMIT = 10;
	
	// 'all', 'overdue', 'checked_out'
	const filter = req.query.filter;
	// page to display
    const p = parseInt(req.query.p || 1);

    // calc offset based on page
    const offset = (p - 1 > 0 ? p - 1 : 0) * 10;

	// default query 
	let query = Query.selectAllLoans(offset, LIMIT);
	if (filter === 'overdue') {
		query = Query.selectOverdueLoans(offset, LIMIT);
	} else if (filter === 'checked_out') {
		query = Query.selectCheckedOutLoans(offset, LIMIT);
	}
	
	Loan.findAndCountAll(query)
		.then((results) => {
			if (results) {
				res.render('loan/loans', { 
					current_page: p,
                    pages: Math.ceil(results.count / LIMIT),
					loans: results.rows, 
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
			res.render('loan/new', {
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
						res.render("loan/new", {
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

/* GET Return Book page (form) */
router.get('/:loan_id/book/:book_id/return', function(req, res, next) {
	const query = Query.selectLoanById(req.params.loan_id);
	
	Loan.findOne(query)
		.then(loan => {
			if (loan) {
				res.render('loan/return', { 
					loan: loan,
					r_loan: Loan.build({
						returned_on: new Date()
					}),
					title: 'Patron: Return Book' 
				});
			} else {
				res.sendStatus(404);
			}
		})
		.catch(err => {
			res.sendStatus(500);
		});
});

router.put('/:loan_id/return', function(req, res, next) { 
	const query = Query.selectLoanById(req.params.loan_id);

	// check that returned_on value is valid 
	if (!req.body.returned_on 
		|| req.body.returned_on.length === 0) {
			// if not, reload book_return with errors
			Loan.findOne(query)
				.then(loan => {
					res.render('loan/return', { 
						loan: loan,
						r_loan: Loan.build({
							returned_on: new Date()
						}),
						title: 'Patron: Return Book',
						errors: [
							{
								message: "Please provide valid 'returned on' date"
							}
						]
					});
				})
				.catch(err => {
					res.send(500);
				});
	} else {
		// else, update loan in db
		Loan.findOne(query)
			.then(loan => {
				return loan.update(req.body);
			})
			.then(loan => {
				res.redirect(`/loans`);
			})
			.catch(err => {
				if(err.name === "SequelizeValidationError") {
					Loan.findOne(query)
						.then(loan => {
							res.render('loan/return', { 
								loan: loan,
								r_loan: Loan.build({
									returned_on: new Date()
								}),
								title: 'Patron: Return Book',
								errors: err.errors
							});
						})
				} else {
					throw err;
				}
			})
			.catch(err => {
				res.send(500);
			});;
	}
});

module.exports = router;
