'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('albums', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        artist_id: {
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        release_date: {
          allowNull: false,
          type: Sequelize.DATE
        },
        image: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      },
        { transaction }
      );

      await queryInterface.addConstraint('albums', {
        fields: ['artist_id'],
        type: 'foreign key',
        name: 'fk_artist_id',
        references: {
          table: 'artists',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
        { transaction }
      );

      await queryInterface.addIndex('albums', ['name','release_date'],{
        transaction
      })
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('albums', {
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  }
};