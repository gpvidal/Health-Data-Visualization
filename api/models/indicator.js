module.exports = function(sequelize, DataTypes) {
  var Indicator = sequelize.define("indicator", {    
    name: DataTypes.STRING
  }, {
    timestamps: false,
  });

  return Indicator;
};