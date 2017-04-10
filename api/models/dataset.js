module.exports = function(sequelize, DataTypes) {
	var Dataset = sequelize.define("dataset", {
		county_id: DataTypes.INTEGER,    
		indicator_id: DataTypes.INTEGER,
		year: DataTypes.INTEGER,
		number: DataTypes.INTEGER,
		percent: DataTypes.DECIMAL,
		lower_confidence_limit: DataTypes.DECIMAL,
		upper_confidence_limit: DataTypes.DECIMAL
	}, {
		timestamps: false,
		classMethods: {
			associate: function(models) {        
				Dataset.belongsTo(models.indicator, {
					foreignKey: {
						fieldName: 'indicator_id'
					}
				}),
				
				Dataset.belongsTo(models.county, {
					foreignKey: {
						fieldName: 'county_id'
					}
				}

				);
			}
		} 
	});

	Dataset.removeAttribute('id');

	return Dataset;
};