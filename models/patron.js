'use strict';

module.exports = (sequelize, DataTypes) => {
	const Patron = sequelize.define('Patron', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataTypes.STRING,
			required: true
		},
		last_name: {
			type: DataTypes.STRING,
			required: true
		},
		address: {
			type: DataTypes.STRING,
			required: true
		},
		email: {
			type: DataTypes.STRING,
			required: true
		},
		library_id: {
			type: DataTypes.STRING,
			required: true
		},
		zip_code: { 
			type: DataTypes.INTEGER,
			len: [5]
		}
	}, {
		timestamps: false
	});

	Patron.associate = function(models) {
		// associations can be defined here
		models.Patron.hasMany(models.Loan, {foreignKey: 'patron_id', sourceKey: 'id'});
	};

	return Patron;
};