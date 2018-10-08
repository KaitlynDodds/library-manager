'use strict';

module.exports = (sequelize, DataTypes) => {
	const Loan = sequelize.define('Loan', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		book_id: {
			type: DataTypes.UUID
		},
		patron_id: {
			type: DataTypes.UUID
		},
		loaned_on: { 
			type: DataTypes.DATE
		},
		returned_by: { 
			type: DataTypes.DATE
		},
		returned_on: { 
			type: DataTypes.DATE
		},
	}, {});

	Loan.associate = function(models) {
		// associations can be defined here
		models.Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'}); 	// Adds patron_id to Loan
		models.Loan.belongsTo(models.Book, {foreignKey: 'book_id'}); 		// Add book_id to Loan
	};

	return Loan;
};