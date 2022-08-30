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
   await queryInterface.bulkInsert('PlaylistSongs' ,[
    {
      playlistId: 1,
      songId: 1
    },
    {
      playlistId: 1,
      songId: 2
    },
    {
      playlistId: 1,
      songId: 5
    },
    {
      playlistId: 2,
      songId: 3
    },
    {
      playlistId: 2,
      songId: 4
    },
    {
      playlistId: 3,
      songId: 6
    },
    {
      playlistId: 3,
      songId: 7
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
    await queryInterface.bulkDelete('PlaylistSongs', null, {})
  }
};
