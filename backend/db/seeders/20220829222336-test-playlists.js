'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name:'One',
        imageUrl:''
      },
      {
        userId: 2,
        name:'Two',
        imageUrl:''
      },
      {
        userId: 3,
        name:'Three',
        imageUrl:''
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Playlists', null, {})
  }
};
