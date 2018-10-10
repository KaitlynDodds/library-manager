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

selectAllLoansAndPatronsAndBooks = {
    include: [
        {
            model: Book
        },
        {
            model: Patron
        }
    ],
}

selectOverdueLoans = {
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

selectCheckedOutLoans = {
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

module.exports = {
    selectAllLoans: selectAllLoans,
    selectOverdueLoans: selectOverdueLoans,
    selectCheckedOutLoans: selectCheckedOutLoans,
    selectAllLoansAndPatronsAndBooks: selectAllLoansAndPatronsAndBooks
}