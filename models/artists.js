'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      artists.hasMany(models.albums)
      artists.belongsToMany(models.users,{through: 'followers'})
    }
  }
  artists.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    indexes:[
      {
        fields: ['name']
      }
    ],
    paranoid: true,
    sequelize,
    modelName: 'artists',
  });
  return artists;
};