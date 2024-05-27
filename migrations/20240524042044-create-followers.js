'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('followers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER
        },
        artist_id: {
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
      await queryInterface.addConstraint('followers', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'fk_user_id_mm_follow',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
        { transaction }
      );
      await queryInterface.addConstraint('followers', {
        fields: ['artist_id'],
        type: 'foreign key',
        name: 'fk_artist_id_mm_follow',
        references: {
          table: 'artists',
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
      await queryInterface.dropTable('followers', {
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  }
};