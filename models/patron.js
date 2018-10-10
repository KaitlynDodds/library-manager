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
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "First name is required"
				},           
			}
		},
		last_name: {
			type: DataTypes.STRING,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Last name is required"
				},           
			}
		},
		address: {
			type: DataTypes.STRING,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Address is required"
				},           
			}
		},
		email: {
			type: DataTypes.STRING,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Email is required"
				},           
			}
		},
		library_id: {
			type: DataTypes.STRING,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Library ID is required"
				},
				startsWith(value) {
					if (value.substring(0, 3) !== "MCL") {
						throw new Error('Library ID must start with \'MCL\'');
					}
				} 
			}
		},
		zip_code: { 
			type: DataTypes.INTEGER,
			validate: {           
				notEmpty: {   // don't allow empty strings
					msg: "Zip Code is required"
				},   
				len: {		  // must be of length 5
					args: [5],
					msg: "Zip Code must be 5 digits"
				}
			}
		}
	}, {
		timestamps: false
	});

	Patron.associate = function(models) {
		// associations can be defined here
		models.Patron.hasMany(models.Loan, {foreignKey: 'patron_id', sourceKey: 'id'});
	};

	// instance level methods 
	Patron.prototype.getFullname = function() {
		return [this.firstname, this.lastname].join(' ');
	};

	return Patron;
};