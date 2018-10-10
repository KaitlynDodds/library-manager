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
	}, {
		timestamps: false
	});

	Loan.associate = function(models) {
		// associations can be defined here
		models.Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'}); 	// Adds patron_id to Loan
		models.Loan.belongsTo(models.Book, {foreignKey: 'book_id'}); 		// Add book_id to Loan
	};

	return Loan;
};