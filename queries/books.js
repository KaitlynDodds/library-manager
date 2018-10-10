const Sequelize         = require('sequelize');
const Op                = Sequelize.Op;

// models
const Book          = require('../models').Book;
const Loan          = require('../models').Loan;
const Patron        = require('../models').Patron;

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

selectBookById = function(given_id) {
    return {
        where: {
            id: {
                [Op.eq]: given_id
            }
        },
        include: [
            {
                model: Loan,
                where: { 
                    book_id: Sequelize.col('book.id'),
                },
                attributes: [
                    'id',
                    'loaned_on',
                    'return_by',
                    'returned_on'
                ],
                include: [
                    { 
                        model: Patron
                    }
                ],
                // if loans don't exist for book, still return book
                required: false
            }
        ]
    };
}

selectBookWhereLoanID = function(book_id, loan_id) {
    return {
        where: {
            id: {
                [Op.eq]: book_id
            }
        },
        include: [
            {
                model: Loan,
                where: { 
                    id: {
                        [Op.eq]: loan_id
                    }
                },
                include: [
                    { 
                        model: Patron
                    }
                ],
                // if loans don't exist for book, still return book
                required: false
            }
        ],
        limit: 1
    };
}

module.exports = {
    selectCheckedOutBooks: selectCheckedOutBooks,
    selectOverdueBooks: selectOverdueBooks,
    selectBookById: selectBookById,
    selectBookWhereLoanID: selectBookWhereLoanID
};