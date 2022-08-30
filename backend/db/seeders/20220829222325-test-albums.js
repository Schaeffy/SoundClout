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
   await queryInterface.bulkInsert('Albums', [
    {
      userId: 2,
      title: 'Tell All Your Friends',
      description: 'Tell All Your Friends is the debut studio album by American rock band Taking Back Sunday, released on March 26, 2002, through Victory Records.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ef/Tellallyourfriends.jpg'
    },
    {
      userId: 2,
      title: 'Deja Entendu',
      description: 'Deja Entendu is the second studio album by American rock band Brand New, released in 2003.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Brand_New_Deja_Entendu.jpg'
    },
    {
      userId: 3,
      title: 'Let It Enfold You',
      description: 'Let It Enfold You is the debut studio album by American post-hardcore band Senses Fail, released on September 7, 2004, through Vagrant Records.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/32/Let_it_enfold_you.jpg'
    },
    {
      userId: 3,
      title: 'All We Know Is Falling',
      description: 'All We Know Is Falling is the debut studio album by American rock band Paramore, released on July 26, 2005, under the Atlantic-distributed Fueled by Ramen in the United States.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Paramore_-_All_We_Know_Is_Falling.png'
    },
    {
      userId: 2,
      title: 'Give Up',
      description: 'Give Up is the only studio album by American electronic duo The Postal Service, released on February 18, 2003, by Sub Pop Records.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/PostalService_cover300dpi.jpg'
    },
    {
      userId: 1,
      title: 'In Keeping Secrets Of Silent Earth: 3',
      description: 'In Keeping Secrets of Silent Earth: 3 is the second studio album by rock quartet Coheed and Cambria. It was released on October 7, 2003, through Equal Vision Records.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ae/In_Keeping_Secrets_of_Silent_Earth_3_cover.jpg'
    },
    {
      userId: 1,
      title: 'Let Go',
      description: 'Let Go is the debut studio album by Canadian singer-songwriter Avril Lavigne. It was released on June 4, 2002 by Arista Records.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/27/Let_Go_cover.png'
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
    await queryInterface.bulkDelete('Albums', null, {})
  }
};
