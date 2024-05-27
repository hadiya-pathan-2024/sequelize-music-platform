'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('users_premium_features', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER
        },
        premium_feature_id: {
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
    {transaction}
    );
    await queryInterface.addConstraint('users_premium_features', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_id_mm_premium',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
      { transaction }
    );
    await queryInterface.addConstraint('users_premium_features', {
      fields: ['premium_feature_id'],
      type: 'foreign key',
      name: 'fk_feature_id_mm_premium',
      references: {
        table: 'premium_features',
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
      await queryInterface.dropTable('users_premium_features',{
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  }
};