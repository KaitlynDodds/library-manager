const Sequelize     = require('sequelize');
const Op            = Sequelize.Op;

// models
const Loan      = require('../models').Loan;
const Book      = require('../models').Book;
const Patron    = require('../models').Patron;

selectAllLoans = {
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
}


module.exports = {
    selectAllLoans: selectAllLoans
}