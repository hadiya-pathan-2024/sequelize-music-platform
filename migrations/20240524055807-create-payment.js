'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('payments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER
        },
        payment_method: {
          allowNull: false,
          type: Sequelize.STRING
        },
        payment_date: {
          allowNull: false,
          type: Sequelize.DATE
        },
        amount: {
          validate:{
            isNumeric: true
          },
          allowNull: false,
          type: Sequelize.INTEGER
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
        },
      },
    {transaction}
    );
    await queryInterface.addConstraint('payments', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_id_mm_payments',
      references: {
        table: 'users',
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
      await queryInterface.dropTable('payments',{
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  }
};