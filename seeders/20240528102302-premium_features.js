'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = queryInterface.sequelize.transaction();
   try {
     await queryInterface.bulkInsert('premium_features', [{
       name: 'Ad-free music listening',
       created_at: new Date(),
       updated_at: new Date()
       },
       {
        name: 'Download Songs',
        created_at: new Date(),
        updated_at: new Date()
        },
        {
          name: 'Group Sessions',
          created_at: new Date(),
          updated_at: new Date()
          }
      ], {},
    {transaction}
    );
       (await transaction).commit();
   } catch (error) {
    console.log("Error", error);
    (await transaction).rollback();
   }
  },

  async down (queryInterface, Sequelize) {
    const transaction = queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('premium_features', null, {}, {transaction});
      (await transaction).commit();
    } catch (error) {
      console.log("Error", error);
      (await transaction).rollback();
    }
  }
};
