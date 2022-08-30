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
     await queryInterface.bulkInsert('Songs', [
      {
        albumId: 1,
        userId: 2,
        title: 'Cute Without The "E" (Cut From The Team)',
        description: '',
        url: '',
        imageUrl:'',
      },
      {
        albumId: 2,
        userId: 2,
        title: 'The Quiet Things That No One Ever Knows',
        description: '',
        url: '',
        imageUrl:'',
      },
      {
        albumId: 3,
        userId: 3,
        title: 'Martini Kiss',
        description: '',
        url: '',
        imageUrl:'',
      },
      {
        albumId: 4,
        userId: 3,
        title: 'Brighter',
        description: '',
        url: '',
        imageUrl:'',
      },
      {
        albumId: 5,
        userId: 2,
        title: 'Brand New Colony',
        description: '',
        url: '',
        imageUrl:'',
      },
      {
        albumId: 6,
        userId: 1,
        title: 'Three Evils (Embodied in Love and Shadow)',
        description: '',
        url: '',
        imageUrl:'',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'Complicated',
        description: '',
        url: '',
        imageUrl:'',
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
     await queryInterface.bulkDelete('Songs', {seededBy: 'test-songs'})
  }
};
