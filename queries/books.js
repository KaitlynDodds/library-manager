const Sequelize         = require('sequelize');
const Op                = Sequelize.Op;

// models
const Book = require('../models').Book;
const Loan = require('../models').Loan;

selectCheckedOutBooks = {
    attributes: [
        'title', 
        'author', 
        'genre', 
        'first_published', 
        'id'
    ],
    include: [{
        model: Loan,
        where: { 
            book_id: Sequelize.col('book.id'),
            // book has not been returned yet 
            returned_on: {
                [Op.eq]: null
            }
        },
        attributes: [
            ['id', 'loan_id']
        ]
    }]
}

selectOverdueBooks = {
    attributes: [
        'title', 
        'author', 
        'genre', 
        'first_published', 
        'id'
    ],
    include: [{
        model: Loan,
        where: { 
            book_id: Sequelize.col('book.id'),
            // less than today's date
            return_by: {
                [Op.lt]: new Date() 
            },
            // returned_on is null (book has not been returned)
            returned_on: {
                [Op.eq]: null
            }
        },
        attributes: [
            ['id', 'loan_id']
        ]
    }]
}

module.exports = {
    selectCheckedOutBooks: selectCheckedOutBooks,
    selectOverdueBooks: selectOverdueBooks
};