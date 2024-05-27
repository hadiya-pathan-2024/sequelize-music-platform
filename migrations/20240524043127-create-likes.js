'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('likes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        date_time: {
          allowNull: false,
          type: Sequelize.DATE
        },
        user_id: {
          type: Sequelize.INTEGER
        },
        tracks_id: {
          type: Sequelize.INTEGER
        },
        create_at: {
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
      await queryInterface.addConstraint('likes', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'fk_mm_likes_user_id',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
        { transaction }
      );
      await queryInterface.addConstraint('likes', {
        fields: ['tracks_id'],
        type: 'foreign key',
        name: 'fk_mm_likes_tracks_id',
        references: {
          table: 'tracks',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('likes', {
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  }
};