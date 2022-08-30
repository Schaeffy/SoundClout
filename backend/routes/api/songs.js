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

const SongValidation = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Song title must be at least one character'),
    handleValidationErrors
]

// Get all songs

router.get('/', restoreUser, requireAuth, async (req, res) => {
    // let { size, page, } = req.query;

    // if (!size) {
    //     size = 20;
    // }
    // if (!page) {
    //     page = 1;
    // }

    // size = parseInt(size)
    // page = parseInt(page)

    // let pagination = {}
    // if (page >= 1 && size >= 1) {
    //     pagination.limit = size
    //     pagination.offset = size * (page - 1)
    // }

    const allSongs = await Song.findAll({
        // ...pagination
    })

    if (!allSongs) {
        res.status(404)
        return res.json({
            errors: [
                {message: "Songs not found"}
            ]
        })
    }

    res.json(allSongs)
})

module.exports = router
