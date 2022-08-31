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
                { message: "Songs not found" }
            ]
        })
    }

    res.json(allSongs)
})

// Get all Songs created by Current User

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id

    const currentUserSongs = await Song.findAll({
        where: {
            userId
        }
    })

    res.json(currentUserSongs)
})

// Get a Song by Id

router.get('/:songId', restoreUser, requireAuth, async (req, res) => {

    const songId = req.params.songId

    const song = await Song.findOne({
        where: {
            id: songId
        },
        include: [{ model: User, as: 'Artist', attributes: ['id', 'username', 'imageUrl'] }, {
            model: Album, attributes: ['id', 'title', 'imageUrl']
        }]
    })

    if (!song) {
        return res.status(404).json({
            errors: [
                {
                    message: "Song couldn't be found",
                    statusCode: 404
                },
            ]
        })
    }

    res.json(song)
})

// Create a song

router.post('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id
    const { title, description, url, imageUrl, albumId } = req.body


    const album = await Album.findOne({
        where: {
            id: albumId
        }
    })

    if (albumId !== null && !album) {
        return res.status(404).json({
            errors: [
                { message: "Album couldn't be found" }
            ]
        })
    }

    if (!title || !url) {
        res.status(400)
        return res.json({
            errors: [
                {
                    "title": "Song title is required",
                    "url": "Audio is required"
                }
            ]
        })
    }

    const newSong = await Song.create({
        userId,
        title,
        description,
        url,
        imageUrl,
        albumId
    })

    res.status(201).json(newSong)
})

router.put('/:songId', restoreUser, requireAuth, async (req, res) => {
    const { title, description, url, imageUrl, albumId } = req.body
    const songId = req.params.songId

    const song = await Song.findOne({
        where: {
            id: songId
        }
    })

    if (!title || !url) {
        res.status(400)
        return res.json({
            errors: [
                {
                    "title": "Song title is required",
                    "url": "Audio is required"
                }
            ]
        })
    }

    if (!song) {
        return res.status(404).json({
            errors: [
                {
                    message: "Song couldn't be found",
                    statusCode: 404
                },
            ]
        })
    }

    if (title) {
        song.title = title
    }
    if (description) {
        song.description = description
    }
    if (url) {
        song.url = url
    }

    await song.save()
    res.status(200).json(song)

})









module.exports = router
