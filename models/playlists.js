'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      playlists.belongsTo(models.users,{foreignKey: 'user_id'})
      playlists.belongsToMany(models.tracks,{through: 'playlist_tracks'})
    }
  }
  playlists.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    paranoid: true,
    sequelize,
    modelName: 'playlists',
  });
  return playlists;
};