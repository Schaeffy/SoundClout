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
        description: 'Song by Taking Back Sunday',
        url: 'https://youtu.be/idiSG4rTn9w',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/e/ef/Tellallyourfriends.jpg',
      },
      {
        albumId: 2,
        userId: 2,
        title: 'The Quiet Things That No One Ever Knows',
        description: 'Song by Brand New',
        url: 'https://youtu.be/MB6ESvoBwxI',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/7/7b/Brand_New_Deja_Entendu.jpg',
      },
      {
        albumId: 3,
        userId: 3,
        title: 'Martini Kiss',
        description: 'Song by Senses Fail',
        url: 'https://youtu.be/htEGtzDnp2k',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/3/32/Let_it_enfold_you.jpg',
      },
      {
        albumId: 4,
        userId: 3,
        title: 'Brighter',
        description: 'Song by Paramore',
        url: 'https://youtu.be/e4miAlnuw8M',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/9/9e/Paramore_-_All_We_Know_Is_Falling.png',
      },
      {
        albumId: 5,
        userId: 2,
        title: 'Brand New Colony',
        description: 'Song by Postal Service',
        url: 'https://youtu.be/-9GuBV9Mp7A',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/c/ce/PostalService_cover300dpi.jpg',
      },
      {
        albumId: 6,
        userId: 1,
        title: 'Three Evils (Embodied in Love and Shadow)',
        description: 'Song by Coheed and Cambria',
        url: 'https://youtu.be/9harALGqtcw',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/a/ae/In_Keeping_Secrets_of_Silent_Earth_3_cover.jpg',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'Complicated',
        description: 'Song by Avril Lavigne',
        url: 'https://youtu.be/pjrBPHjCiuI',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/2/27/Let_Go_cover.png',
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
     await queryInterface.bulkDelete('Songs', null, {})
  }
};
