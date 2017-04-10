module.exports = function(sequelize, DataTypes) {
  var County = sequelize.define("county", {    
    name: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'counties',    
	classMethods: {
		associate: function(models) {        
			County.belongsTo(models.state, {
				foreignKey: {
					fieldName: 'state_id'
				}
			});
		}
	}	
	
	});

  return County;
};