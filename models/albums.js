'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      albums.belongsTo(models.artists,{foreignKey: 'artist_id'})
      albums.hasMany(models.tracks)
    }
  }
  albums.init({
    artist_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    release_date: DataTypes.DATE,
    image: DataTypes.STRING
  }, {
    indexes:[
      {
        fields: ['name','release_date']
      }
    ],
    paranoid: true,
    sequelize,
    modelName: 'albums',
  });
  return albums;
};