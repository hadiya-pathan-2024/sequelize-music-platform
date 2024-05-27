'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.playlists)
      users.belongsToMany(models.artists,{through: 'followers'})
      users.belongsToMany(models.tracks, {through: 'likes'})
      users.belongsToMany(models.premium_feature, {through: 'users_premium_features'})
      users.hasMany(models.notifications)
      users.hasMany(models.payment)
    }
  }
  users.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dob: DataTypes.DATE,
    user_type: DataTypes.STRING,
    profile_image: DataTypes.STRING
  }, {
    indexes:[
       {
         fields: ['first_name','email']
        }
    ],
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid:true,
    sequelize,
    modelName: 'users',
  });
  return users;
};