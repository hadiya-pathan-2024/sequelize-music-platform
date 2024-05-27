'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist_tracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  playlist_tracks.init({
    playlist_id: DataTypes.INTEGER,
    tracks_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'playlist_tracks',
  });
  return playlist_tracks;
};