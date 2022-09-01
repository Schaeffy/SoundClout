// backend/routes/api/users.js
const express = require('express')


const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, Playlist } = require('../../db/models');

// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();

// backend/routes/api/users.js
// ...
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid last name.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// backend/routes/api/users.js
// ...

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, user);
    user.token = token

    // Adding this info made userId populate
    return res.json({
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "username": user.username,
      "token": user.token
    });
  }
);




// Get details of an Artist from an Id


router.get('/:userId', restoreUser, async (req, res) => {
  const userId = req.params.userId

  const artist = await User.findByPk(userId, {
      attributes:
              ['id','username','imageUrl']

  })

  if (!artist) {
      return res.status(404).json({
          message: "Artist couldn't be found",
          statusCode: 404
      })
  }

  const  totalSongs = await Song.count({
      where: {userId: userId}
  })

  const totalAlbums = await Album.count({
      where: {userId: userId}
  })

  res.json({
      'id': artist.id,
      'username': artist.username,
      'imageUrl': artist.imageUrl,
      'totalSongs': totalSongs,
      'totalAlbums': totalAlbums
  })

})


router.get('/:userId/playlists', restoreUser, async (req, res) => {
  const userId = req.params.userId

  const user = await User.findByPk(userId)

  const playlists = await Playlist.findAll({
    where:{
      userId
    }
  })

  if (!user) {
    return res.status(404).json({
      message: "Artist couldn't be found",
      statusCode: 404
    })
  }

  res.json({Playlists: playlists})
})



module.exports = router;
