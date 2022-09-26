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
        url: 'https://many-ringtones.com/ringtones/01/many-ringtones-com-3787697.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/e/ef/Tellallyourfriends.jpg',
      },
      {
        albumId: 2,
        userId: 2,
        title: 'The Quiet Things That No One Ever Knows',
        description: 'Song by Brand New',
        url: 'https://cdn.pixabay.com/download/audio/2021/09/25/audio_153f263349.mp3?filename=cinematic-fairy-tale-story-main-8697.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/7/7b/Brand_New_Deja_Entendu.jpg',
      },
      {
        albumId: 3,
        userId: 3,
        title: 'Martini Kiss',
        description: 'Song by Senses Fail',
        url: 'https://cdn.pixabay.com/download/audio/2021/11/13/audio_cb4f1212a9.mp3?filename=ambient-piano-ampamp-strings-10711.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/3/32/Let_it_enfold_you.jpg',
      },
      {
        albumId: 4,
        userId: 3,
        title: 'Brighter',
        description: 'Song by Paramore',
        url: 'https://many-ringtones.com/ringtones/03/many-ringtones-com-3841310.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/9/9e/Paramore_-_All_We_Know_Is_Falling.png',
      },
      {
        albumId: 5,
        userId: 2,
        title: 'Brand New Colony',
        description: 'Song by Postal Service',
        url: 'https://many-ringtones.com/ringtones/04/many-ringtones-com-3850085.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/c/ce/PostalService_cover300dpi.jpg',
      },
      {
        albumId: 6,
        userId: 1,
        title: 'Three Evils (Embodied in Love and Shadow)',
        description: 'Song by Coheed and Cambria',
        url: 'https://many-ringtones.com/ringtones/03/many-ringtones-com-3851995.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/a/ae/In_Keeping_Secrets_of_Silent_Earth_3_cover.jpg',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'Complicated',
        description: 'Song by Avril Lavigne',
        url: 'https://cdn.pixabay.com/download/audio/2022/06/25/audio_944aab53cf.mp3?filename=epicaly-113907.mp3',
        imageUrl:'https://upload.wikimedia.org/wikipedia/en/2/27/Let_Go_cover.png',
      },
      {
        albumId: 6,
        userId: 1,
        title: 'Random Song',
        description: 'A Placeholder Song',
        url: 'https://cdn.pixabay.com/download/audio/2022/09/22/audio_14e9964c5f.mp3?filename=blessed-120698.mp3',
        imageUrl:'https://cdn.pixabay.com/audio/2022/09/24/09-19-03-222_200x200.jpeg',
      },
      {
        albumId: 3,
        userId: 1,
        title: 'Another Random Song',
        description: 'Songs',
        url: 'https://cdn.pixabay.com/download/audio/2022/09/22/audio_14e9964c5f.mp3?filename=blessed-120698.mp3',
        imageUrl:'https://cdn.pixabay.com/audio/2022/09/24/09-19-03-222_200x200.jpeg',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'A Third Song',
        description: 'Song 3',
        url: 'https://cdn.pixabay.com/download/audio/2022/09/22/audio_14e9964c5f.mp3?filename=blessed-120698.mp3',
        imageUrl:'https://cdn.pixabay.com/audio/2022/09/24/09-19-03-222_200x200.jpeg',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'A Fourth Song',
        description: 'Song 4',
        url: 'https://cdn.pixabay.com/download/audio/2022/09/22/audio_14e9964c5f.mp3?filename=blessed-120698.mp3',
        imageUrl:'https://cdn.pixabay.com/audio/2022/09/24/09-19-03-222_200x200.jpeg',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'A Fifth Song',
        description: 'Song 5',
        url: 'https://cdn.pixabay.com/download/audio/2022/09/22/audio_14e9964c5f.mp3?filename=blessed-120698.mp3',
        imageUrl:'https://cdn.pixabay.com/audio/2022/09/24/09-19-03-222_200x200.jpeg',
      },
      {
        albumId: 7,
        userId: 1,
        title: 'A Sixth Song',
        description: 'Song 6',
        url: 'https://cdn.pixabay.com/download/audio/2022/09/22/audio_14e9964c5f.mp3?filename=blessed-120698.mp3',
        imageUrl:'https://cdn.pixabay.com/audio/2022/09/24/09-19-03-222_200x200.jpeg',
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
