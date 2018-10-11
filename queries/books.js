const Sequelize         = require('sequelize');
const Op                = Sequelize.Op;

// models
const Book          = require('../models').Book;
const Loan          = require('../models').Loan;
const Patron        = require('../models').Patron;

selectCheckedOutBooks = function(offset, limit) {
    return {
        offset: offset, 
        limit: limit,
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
}

selectOverdueBooks = function(offset, limit) {
    return {
        offset: offset,
        limit: limit,
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

findSearchResults = function(search, limit, offset) {
    return {
        offset: offset, 
        limit: limit,
        where: { 
            [Op.or]: [
                {   // title LIKE search
                    title: {            
                        [Op.like]: `%${search}%`
                    }
                },
                {   // author LIKE search
                    author: {           
                        [Op.like]: `%${search}%`
                    }
                },
                {   // genre LIKE search
                    genre: {            
                        [Op.like]: `%${search}%`
                    }
                },
                {   // first_published LIKE search
                    first_published: {  
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        },
    }
}

module.exports = {
    selectCheckedOutBooks: selectCheckedOutBooks,
    selectOverdueBooks: selectOverdueBooks,
    selectBookById: selectBookById,
    findSearchResults: findSearchResults
};