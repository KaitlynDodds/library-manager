'use strict';

module.exports = (sequelize, DataTypes) => {
	const Loan = sequelize.define('Loan', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		book_id: {
			type: DataTypes.INTEGER,
			validate: {           
				isInt: {
					msg: "You must select a book"
				}          
			}
		},
		patron_id: {
			type: DataTypes.INTEGER,
			validate: {           
				isInt: {
					msg: "You must select a patron"
				}          
			}
		},
		loaned_on: { 
			type: DataTypes.DATEONLY,
			validate: {
				isDate: {
					msg: "Please provide a loaned on date"
				}
			}
		},
		return_by: { 
			type: DataTypes.DATEONLY,
			validate: {
				isDate: {
					msg: "Please provide a return by date"
				}
			}
		},
		returned_on: { 
			type: DataTypes.DATEONLY,
			allowNull: true,
			defaultValue: null,
		},
	}, 
	{
        timestamps: false,
        validate: {
            returnByIsAfterLoanedOn: function() {
                if (this.loaned_on >= this.return_by) {
                    throw new Error('Return by must be after date loaned on');
                }
            },
            returnedOnIsAfterLoanedOn: function() {
                if (this.returned_on < this.loaned_on) {
                    throw new Error('Returned on must be after or equal to date loaned on');
                }
            }
        }
	});

	Loan.associate = function(models) {
		// associations can be defined here
		models.Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'}); 	// Adds patron_id to Loan
		models.Loan.belongsTo(models.Book, {foreignKey: 'book_id'}); 		// Add book_id to Loan
	};

	return Loan;
};