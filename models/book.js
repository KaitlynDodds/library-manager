'use strict';

module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define('Book', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Title is required"
				},           
			}
		},
		author: {
			type: DataTypes.STRING,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Author is required"
				},           
			}
		},
		genre: {
			type: DataTypes.STRING,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Genre is required"
				},           
			}
		},
		first_published: { 
			type: DataTypes.INTEGER,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Year published is required"
				},       
				len: {
					args: [4],
					msg: "Year published must be 4 digits"
				}    
			}
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