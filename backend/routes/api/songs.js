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


// Get all Comments by Song Id

router.get('/:songId/comments', restoreUser, requireAuth, async (req, res) => {
    const songId = req.params.songId

    const comments = await Comment.findByPk(songId, {
        include: [
            { model: User, attributes: ['id', 'username'] }
        ]
    })

    if (!comments) {
        return res.status(404).json({

            message: "Song couldn't be found",
            statusCode: 404

        })
    }

    res.json(comments)
})


// Create Comment for Song based on Song Id

router.post('/:songId/comments', restoreUser, requireAuth, async (req, res) => {
    const songId = req.params.songId
    const userId = req.user.id
    const { body } = req.body

    const song = await Song.findByPk(songId)

    if (!body) {
        res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                body: "Comment body text is required"
            }
        })
    }

    if (!song) {
        res.status(404).json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    const comment = await Comment.create({
        userId,
        songId,
        body
    })
    return res.json(comment)
})



// Get all songs

router.get('/', restoreUser, async (req, res) => {

    let { page, size, title, createdAt } = req.query


    page = parseInt(page)
    size = parseInt(size)

    if ((!page) || page > 10) page = 1
    if ((!size) || size > 20) size = 20

    let pagination = {}
    let where = {}

    pagination.limit = size
    pagination.offset = size * (page - 1)

    if (title) where.title = title
    if (createdAt) where.createdAt = createdAt

    const allSongs = await Song.findAll({
        include:
        [{
            model: User, as: 'Artist',
            attributes: ['id', 'username', 'imageUrl']
        },
        {
            model: Album,
            attributes: ['id', 'title', 'imageUrl']
        }],
        where: {...where},
        ...pagination
    })

    res.json({
        Songs: allSongs,
        page,
        size,
    })
})

// Get all Songs created by Current User

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id

    const currentUserSongs = await Song.findAll({
        where: {
            userId
        }
    })

    res.json({ Songs: currentUserSongs })
})

// Get a Song by Id

router.get('/:songId', restoreUser,  async (req, res) => {

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

            message: "Song couldn't be found",
            statusCode: 404

        })
    }

    res.json(song)
})

// Create a song

router.post('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id
    const { title, description, url, imageUrl, albumId } = req.body


    const album = await Album.findByPk(albumId)

    if (albumId !== null && !album) {
        return res.status(404).json({

            message: "Album couldn't be found",
            statusCode: 404

        })
    }

    if (!title || !url) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
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


// Edit a Song

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
            message: "Validation Error",
            statusCode: 400,
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

            message: "Song couldn't be found",
            statusCode: 404

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

    if (albumId) {
        song.albumId = albumId
    }

    await song.save()
    res.status(200).json(song)

})



// Delete a Song

router.delete('/:songId', restoreUser, requireAuth, async (req, res) => {
    const songId = req.params.songId
    const userId = req.user.id

    const song = await Song.findByPk(songId)

    if (!song) {
        return res.status(404).json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    if (userId !== song.userId) {
        return res.status(403).json({
            title: "Authentication error",
            statuscode: 403,
            message: "This song does not belong to you"
        })
    }

    await song.destroy()
    res.status(200).json({
        message: "Sucessfully deleted",
        statusCode: 200
    })
})





module.exports = router
