const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, Playlist, PlaylistSong } = require('../../db/models');


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


// Get all Playlists created by the Current User

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id

    const playlist = await Playlist.findAll({
        where: {
            userId
        },
        attributes: {
            include: ['id', 'userId', 'name', 'createdAt', 'updatedAt', 'imageUrl']
        }
    })

    if (!playlist) {
        return res.status(404).json({
            message: "No playlists found",
            statusCode: 404
        })
    }

    res.json({Playlists: playlist})
})


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


//Edit a Playlist

router.put('/:playlistId', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id
    const playlistId = req.params.playlistId
    const {name, imageUrl} = req.body

    const playlist = await Playlist.findByPk(playlistId, {
        attributes: {
            include: ['id', 'userId', 'name', 'imageUrl', 'createdAt', 'updatedAt']
        }
    })

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist couldn't be found",
            statusCode: 404
        })
    }

    if (playlist.userId !== userId) {
        return res.status(403).json({
            title: "Authentication error",
            statuscode: 403,
            message: "This playlist does not belong to you"
        })
    }

    if (name) playlist.name = name
    if (imageUrl) playlist.imageUrl = imageUrl

    await playlist.save()
    return res.json(playlist)
})

// Get Songs by Playlist Id

router.post('/:playlistId/songs', restoreUser, requireAuth, async (req, res) => {
    const playlistId = req.params.playlistId
    const userId = req.user.id

    const {songId} = req.body

    const song = await Song.findByPk(songId)
    const playlist = await Playlist.findByPk(playlistId)

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist couldn't be found",
            statusCode: 404
        })
    }
    if (!song) {
        return res.status(404).json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }
    if (playlist.userId !== userId) {
        return res.status(403).json({
            title: "Authentication error",
            statuscode: 403,
            message: "This playlist does not belong to you"
        })
    }

    const createdPlaylist = await PlaylistSong.create({
        songId,
        playlistId
    })

    const foundPlaylistSong = await PlaylistSong.findOne({
        where: {
            "playlistId": playlistId,
            "songId": songId
        },
        attributes: ['id','playlistId','songId']
    })

    res.status(201).json(foundPlaylistSong)
})

//Get details of a Playlist by ID

router.get('/:playlistId', restoreUser, async (req, res) => {
    const playlistId = req.params.playlistId

    const playlist = await Playlist.findByPk(playlistId,{
        include: [{
            model: Song,
            attributes:['id','userId','albumId','title','description','url','createdAt','updatedAt','imageUrl'],
            through: {attributes:[]},

        }],
        // where: {id: playlistId}
    })

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist Couldn't be found",
            statusCode: 404
        })
    }
    res.status(200).json(playlist)
})


// Delete a Playlist

router.delete('/:playlistId', restoreUser, requireAuth, async (req, res) => {
    const playlistId = req.params.playlistId
    const userId = req.user.id

    const playlist = await Playlist.findByPk(playlistId)

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist couldn't be found",
            statusCode: 404
        })
    }

    if (userId !== playlist.userId) {
        return res.status(403).json({
            title: "Authentication error",
            statuscode: 403,
            message: "This playlist does not belong to you"
        })
    }

    await playlist.destroy()
    res.status(200).json({
        message: "Sucessfully deleted",
        statusCode: 200
    })
})



module.exports = router
