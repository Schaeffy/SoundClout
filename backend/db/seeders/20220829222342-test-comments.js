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
     await queryInterface.bulkInsert('Comments', [
      {
        userId: 2,
        songId: 1,
        body: 'So awesome!'
      },
      {
        userId: 3,
        songId: 3,
        body: 'Poggers!'
      },
      {
        userId: 2,
        songId: 2,
        body: 'Emo4lyfe'
      },
      {
        userId: 3,
        songId: 4,
        body: 'omg so kool'
      },
      {
        userId: 1,
        songId: 5,
        body: 'i luv this band so mcuh!'
      },
      {
        userId: 2,
        songId: 5,
        body: 'my life theme song'
      },
      {
        userId: 1,
        songId: 7,
        body: 'This whole album is amazing'
      }
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Comments', null, {})
  }
};
