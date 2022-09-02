
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, Playlist } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const { Op } = require('sequelize');

const ArtistValidation = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Comment must be at least one character'),
    handleValidationErrors
]

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


// Get all Songs of an Artist from an Id

router.get('/:artistId/songs', restoreUser, async (req, res) => {
    const artistId = req.params.artistId

    const artist = await User.findByPk(artistId)

    if (!artist) {
        return res.status(404).json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }

    const songs = await Song.findAll({
        where: {
            userId: artistId
        }
    })

    res.status(200).json({Songs:songs})
})


//Get all Playlists by Artist Id

router.get('/:userId/playlists', restoreUser, async (req, res) => {
    const userId = req.params.userId

    const user = await User.findByPk(userId)

    if (!user) {
        return res.status(404).json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }



    const playlist = await Playlist.findAll({
        where: {
            userId
        },
        attributes: {include: ['id', 'userId', 'name', 'imageUrl', 'createdAt', 'updatedAt']}
    })

    if (!playlist) {
        return res.status(404).json({
            message: "No playlists found",
            statusCode: 404
        })
    }

    res.json({Playlists:playlist})
})

























module.exports = router
