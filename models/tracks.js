'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tracks.belongsTo(models.albums,{foreignKey: 'album_id'})
      tracks.belongsToMany(models.playlists, {through: 'playlist_tracks'})
      tracks.belongsToMany(models.users, {through: 'likes'})
    }
  }
  tracks.init({
    album_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    indexes:[
      {
        fields: ['name']
      }
    ],
    paranoid:true,
    sequelize,
    modelName: 'tracks',
  });
  return tracks;
};