const Sequelize     = require('sequelize');
const Op            = Sequelize.Op;

// models
const Loan      = require('../models').Loan;
const Book      = require('../models').Book;
const Patron    = require('../models').Patron;

selectAllLoans = function(offset, limit) {
    return {
        limit: limit,
        offset: offset,
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
}

selectOverdueLoans = function(offset, limit) {
    return {
        limit: limit,
        offset: offset,
        where: {
            // less than today's date
            return_by: {
                [Op.lt]: new Date() 
            },
            // returned_on is null (book has not been returned)
            returned_on: {
                [Op.eq]: null
            }
        },
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
}

selectCheckedOutLoans = function(offset, limit) {
    return {
        limit: limit,
        offset: offset,
        where: {
            // book has not been returned yet 
            returned_on: {
                [Op.eq]: null
            }
        },
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
}

/* Get all Book and Patron info for loan */
selectLoanById = function(loan_id) {
    return {
        where: {
            id: {
                [Op.eq]: loan_id
            }
        },
        include: [
            {
                model: Book,
            },
            {
                model: Patron
            }
        ]
    };
}

module.exports = {
    selectAllLoans: selectAllLoans,
    selectOverdueLoans: selectOverdueLoans,
    selectCheckedOutLoans: selectCheckedOutLoans,
    selectLoanById: selectLoanById
}