'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
   try {
     await queryInterface.createTable('artists', {
       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
       name: {
         allowNull: false,
         type: Sequelize.STRING
       },
       genre: {
         allowNull: false,
         type: Sequelize.STRING
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
    {transaction}
  );
  await queryInterface.addIndex('artists', ['name'],{
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
      await queryInterface.dropTable('artists',{
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("Error", error);
    }
  }
};