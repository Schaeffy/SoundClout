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
        url: 'https://mus4.gomusic.fm/6d4e5418-e19b-4041-aec2-a45a098a33816800.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/e/ef/Tellallyourfriends.jpg',
      },
      {
        albumId: 2,
        userId: 2,
        title: 'The Quiet Things That No One Ever Knows',
        description: 'Song by Brand New',
        url: 'https://mus11.gomusic.fm/51c9e162-deba-48d6-aadb-9c1eb93ba65f6f02.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/7/7b/Brand_New_Deja_Entendu.jpg',
      },
      {
        albumId: 3,
        userId: 3,
        title: "I'm Not Okay",
        description: 'Song by My Chemical Romance',
        url: 'https://mus3.gomusic.fm/89dbc951-4867-4768-8316-b9bae5b39b0e6702.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/5/54/Three_Cheers_for_Sweet_Revenge.png',
      },
      {
        albumId: 4,
        userId: 2,
        title: "Sugar We're Going Down",
        description: 'Song by Fall Out Boy',
        url: 'https://mus4.gomusic.fm/623a2fcd-fd16-4e69-ae00-1f653b4acd2a6804.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/0/00/Fall_Out_Boy_-_From_Under_the_Cork_Tree_-_CD_album_cover.jpg',
      },
      {
        albumId: 5,
        userId: 2,
        title: 'Brand New Colony',
        description: 'Song by Postal Service',
        url: 'https://mus2.gomusic.fm/4bc951bc-8e56-43fe-b994-14e35ed91abf6600.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/c/ce/PostalService_cover300dpi.jpg',
      },
      {
        albumId: 6,
        userId: 1,
        title: 'Three Evils (Embodied in Love and Shadow)',
        description: 'Song by Coheed and Cambria',
        url: 'https://mus2.gomusic.fm/2bfc6cec-4358-4fa8-82e0-af28ca5119156600.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/a/ae/In_Keeping_Secrets_of_Silent_Earth_3_cover.jpg',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'Complicated',
        description: 'Song by Avril Lavigne',
        url: 'https://mus3.gomusic.fm/3441177d-4443-4890-9953-de5c9708e0306702.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/2/27/Let_Go_cover.png',
      },
      {
        albumId: 1,
        userId: 2,
        title: "You're So Last Summer",
        description: 'A song by Taking Back Sunday',
        url: 'https://mus4.gomusic.fm/7e748904-4069-4172-9cfe-a2e8356138bf6801.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/e/ef/Tellallyourfriends.jpg',
      },
      {
        albumId: 9,
        userId: 2,
        title: "I've Got a Dark Alley and a Bad Idea That Says You Should Shut Your Mouth",
        description: 'A song by Fall Out Boy',
        url: 'https://mus4.gomusic.fm/cfa26de0-a76a-43fa-ac6a-4c8999570ff66804.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/0/01/Take_This_To_Your_Grave.jpg',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'Sk8er Boi',
        description: 'Song by Avril Lavigne',
        url: 'https://mus1.gomusic.fm/2b6d4d5b-099a-4905-8062-94e7bbfef58e6502.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/2/27/Let_Go_cover.png',
      },
      {
        albumId: 9,
        userId: 2,
        title: 'Dead On Arrival',
        description: 'Song by Fall Out Boy',
        url: 'https://mus2.gomusic.fm/9f5bcbd7-cc9a-4915-ae83-d7b42b129c606604.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/0/01/Take_This_To_Your_Grave.jpg',
      },
      {
        albumId: 5,
        userId: 2,
        title: "Nothing Better",
        description: 'Song by The Postal Service',
        url: 'https://mus3.gomusic.fm/69e026fd-a155-4c56-b6d3-5e01425610f56700.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/c/ce/PostalService_cover300dpi.jpg',
      },
      {
        albumId: 6,
        userId: 1,
        title: 'Blood Red Summer',
        description: 'Song by Coheed and Cambria',
        url: 'https://mus2.gomusic.fm/4157f4e7-7e26-487e-b61b-cd9be6f60a7d6600.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/a/ae/In_Keeping_Secrets_of_Silent_Earth_3_cover.jpg',
      },
      {
        albumId: 8,
        userId: 4,
        title: 'None Shall Pass',
        description: 'Song by Aesop Rock',
        url: 'https://mus4.gomusic.fm/7884f60e-4183-446d-987f-4c0ac6013fe86801.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/e/e8/None_shall_pass_aes_rock.jpg',
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
     await queryInterface.bulkDelete('Songs', null, {})
  }
};
