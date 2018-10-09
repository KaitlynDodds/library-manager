const Sequelize         = require('sequelize');
const Op                = Sequelize.Op;

// models
const Patron        = require('../models').Patron;
const Loan          = require('../models').Loan;
const Book          = require('../models').Book;

selectPatronById = function(given_id) {
    return {
        where: {
            id: {
                [Op.eq]: given_id
            }
        },
        include: [
            {
                model: Loan,
                attributes: [
                    ['id', 'loan_id'],
                    'loaned_on',
                    'return_by',
                    'returned_on'
                ],
                where: { 
                    patron_id: Sequelize.col('patron.id'),
                },
                include: [
                    { 
                        model: Book
                    }
                ],
                // if patron has no loan history, still return patron info
                required: false
            }
        ]
    };
}

module.exports = {
    selectPatronById: selectPatronById
}