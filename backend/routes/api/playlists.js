const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, Playlist } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const { Op } = require('sequelize');


const PlaylistValidation = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Playlist must be at least one character'),
    handleValidationErrors
]

// Create a Playlist

router.post('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id
    const {name, imageUrl} = req.body

    const playlist = await Playlist.create({
        userId: userId,
        name,
        imageUrl
    })

    if (!name) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                name: "Playlist name is required"
            }
        })
    }

    res.status(201).json(playlist)
})



module.exports = router
