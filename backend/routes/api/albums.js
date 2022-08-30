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

const { Op } = require('sequelize')

const AlbumValidation = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Album title must be at least one character'),
    handleValidationErrors
]

router.post('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id
    const {title, description, imageUrl} = req.body

    const newAlbum = await Album.create({
        userId,
        title,
        description,
        imageUrl
    })

    res.status(201).json(newAlbum)
})

module.exports = router
