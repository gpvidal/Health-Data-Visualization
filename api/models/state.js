module.exports = function(sequelize, DataTypes) {
  var State = sequelize.define("state", {    
    name: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'states'    
  });

  return State;
};