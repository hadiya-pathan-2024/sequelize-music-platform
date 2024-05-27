'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('playlist_tracks', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        playlist_id: {
          type: Sequelize.INTEGER
        },
        tracks_id: {
          type: Sequelize.INTEGER
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
        { transaction }
      );
      await queryInterface.addConstraint('playlist_tracks',{
        fields: ['playlist_id'],
        type: 'foreign key',
        name: 'fk_playlist_id_mm',
        references:{
          table: 'playlists',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },{
        transaction
      });
      await queryInterface.addConstraint('playlist_tracks',{
        fields: ['tracks_id'],
        type: 'foreign key',
        name: 'fk_tracks_id_mm',
        references: {
          table: 'tracks',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },{
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('playlist_tracks',{
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  }
};