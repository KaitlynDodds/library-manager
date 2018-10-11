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

findSearchResults = function(search, limit, offset) {
    return {
        offset: offset, 
        limit: limit,
        where: { 
            [Op.or]: [
                {   // first_name LIKE search
                    first_name: {            
                        [Op.like]: `%${search}%`
                    }
                },
                {   // last_name LIKE search
                    last_name: {           
                        [Op.like]: `%${search}%`
                    }
                },
                {   // library_id LIKE search
                    library_id: {            
                        [Op.like]: `%${search}%`
                    }
                },
                {   // address LIKE search
                    address: {  
                        [Op.like]: `%${search}%`
                    }
                },
                {   // email LIKE search
                    email: {  
                        [Op.like]: `%${search}%`
                    }
                },
                {   // zip_code LIKE search
                    zip_code: {  
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        },
    }
}


module.exports = {
    selectPatronById: selectPatronById,
    findSearchResults: findSearchResults
}