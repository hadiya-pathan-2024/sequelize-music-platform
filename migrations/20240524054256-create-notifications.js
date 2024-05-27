'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
   try {
     await queryInterface.createTable('notifications', {
       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
       user_id: {
         type: Sequelize.INTEGER
       },
       title: {
         allowNull: false,
         type: Sequelize.STRING
       },
       content: {
         allowNull: false,
         type: Sequelize.STRING
       },
       creation_date: {
         allowNull: false,
         type: Sequelize.DATE
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
    await queryInterface.addConstraint('notifications', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_id_mm_notification',
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
      await queryInterface.dropTable('notifications',{
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  }
};