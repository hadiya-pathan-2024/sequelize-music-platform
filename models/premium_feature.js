'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class premium_feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      premium_feature.belongsToMany(models.users, {through: 'users_premium_features'})
    }
  }
  premium_feature.init({
    name: DataTypes.STRING
  }, {
    paranoid: true,
    sequelize,
    modelName: 'premium_feature',
  });
  return premium_feature;
};