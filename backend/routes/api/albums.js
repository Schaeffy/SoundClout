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

// Get all Albums
router.get('/', restoreUser, requireAuth, async (req, res) => {
    const albums = await Album.findAll ({

    })

    res.json(albums)
})

// Get Albums by Current User
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id

    const currentUserAlbum = await Album.findAll({
        where: {
            userId
        },
    })

    res.json(currentUserAlbum)
})

// Get Albums by Id
router.get('/:albumId', restoreUser, requireAuth, async (req, res) => {

    const albumId = req.params.albumId

    const album = await Album.findOne({
        where: {
            id: albumId
        },
        include: [{ model: Song,
            attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl']
        }]
    })

    if (!album) {
        return res.status(404).json({
            errors: [
                {
                    message: "Album couldn't be found",
                    statusCode: 404
                },
            ]
        })
    }

    res.json(album)
})


// Create Album
router.post('/', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id
    const {title, description, imageUrl} = req.body

    const newAlbum = await Album.create({
        userId,
        title,
        description,
        imageUrl
    })

    if (!title) {
        res.status(400)
        return res.json({
            errors: [
                {
                    "title": "Album title is required",
                }
            ]
        })
    }

    res.status(201).json(newAlbum)
})

// Edit an Album

router.put('/:albumId', restoreUser, requireAuth, async (req, res) => {
    const { title, description,imageUrl } = req.body
    const albumId = req.params.albumId

    const album = await Album.findOne({
        where: {
            id: albumId
        }
    })

    if (!title) {
        res.status(400)
        return res.json({
            errors: [
                {
                    "title": "Album title is required",
                }
            ]
        })
    }

    if (!album) {
        return res.status(404).json({
            errors: [
                {
                    message: "Album couldn't be found",
                    statusCode: 404
                },
            ]
        })
    }

    if (title) {
        album.title = title
    }
    if (description) {
        album.description = description
    }
    if (imageUrl) {
        album.imageUrl = imageUrl
    }

    await album.save()
    res.status(200).json(album)

})

module.exports = router
