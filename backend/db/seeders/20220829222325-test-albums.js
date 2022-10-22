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
      title: 'Three Cheers For Sweet Revenge',
      description: 'Three Cheers for Sweet Revenge is the second studio album by American rock band My Chemical Romance, released on June 8, 2004, by Reprise Records.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/54/Three_Cheers_for_Sweet_Revenge.png'
    },
    {
      userId: 3,
      title: 'From Under The Cork Tree',
      description: "From Under the Cork Tree is the second studio album by the American rock band Fall Out Boy, released on May 3, 2005, through Island Records as the band's major label debut.",
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/00/Fall_Out_Boy_-_From_Under_the_Cork_Tree_-_CD_album_cover.jpg'
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
    },
    {
      userId: 4,
      title: 'None Shall Pass',
      description: 'None Shall Pass is the fifth studio album by American hip hop artist Aesop Rock. It was released on Definitive Jux on August 28, 2007.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e8/None_shall_pass_aes_rock.jpg'
    },
    {
      userId: 2,
      title: 'Take This To Your Grave',
      description: 'Take This to Your Grave is the debut studio album by American rock band Fall Out Boy, released on May 6, 2003, by Fueled by Ramen.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/01/Take_This_To_Your_Grave.jpg'
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
