'use strict';

module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define('Book', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		title: {
			type: DataTypes.STRING,
			required: true
		},
		author: {
			type: DataTypes.STRING,
			required: true
		},
		genre: {
			type: DataTypes.STRING,
			required: true
		},
		first_published: { 
			type: DataTypes.INTEGER,
			len: [4]
		}
	}, {
		timestamps: false
	});

	Book.associate = function(models) {
		// associations can be defined here
		models.Book.hasMany(models.Loan, {foreignKey: 'book_id', sourceKey: 'id'});
	};

	return Book;
};