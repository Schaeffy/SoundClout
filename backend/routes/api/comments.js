
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, Playlist } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const { Op } = require('sequelize')

const CommentValidation = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Comment must be at least one character'),
    handleValidationErrors
]


router.put('/:commentId', restoreUser, requireAuth, async (req, res) => {
    const commentId = req.params.commentId
    const userId = req.user.id
    const {body} = req.body

    const comment = await Comment.findByPk(commentId)

    if (!body) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                body: "Comment body text is required"
            }
        })
    }
    if (!comment) {
        return res.status(404).json({

            message: "Comment couldn't be found",
            statusCode: 404

        })
    }

    if (userId !== comment.userId) {
        return res.status(403).json({
            title: "Authentication error",
            statuscode: 403,
            message: "This comment does not belong to you"
        })
    }

    if (body) {
        comment.body = body
        await comment.save()
    }
    res.status(200).json(comment)
})


router.delete('/:commentId', restoreUser, requireAuth, async (req, res) => {
    const commentId = req.params.commentId
    const userId = req.user.id

    const comment = await Comment.findByPk(commentId)

    if (!comment) {
        return res.status(404).json({
            message: "Comment couldn't be found",
            statusCode: 404
        })
    }

    if (userId !== comment.userId) {
        return res.status(403).json({
            title: "Authentication error",
            statuscode: 403,
            message: "This comment does not belong to you"
        })
    }

    await comment.destroy()
    res.status(200).json({
        message: "Sucessfully deleted",
        statusCode: 200
    })
})






module.exports = router
