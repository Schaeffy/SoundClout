import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editComment } from '../../store/songs'
import { useHistory, useParams } from 'react-router-dom';

export default function EditComments({ setModalOpen, comment }) {
    const dispatch = useDispatch();
    // const history = useHistory()

    const commentId = comment.id
    const [commentBody, setCommentBody] = useState(comment.body)
    const [errors, setErrors] = useState([])


    // useEffect(() => {
    //     const validationErrors = []




    //     setErrors(validationErrors)
    // },[])

    const handleSubmit = (e) => {
        e.preventDefault()

        setModalOpen(false)
        if (!errors.length) {
            return dispatch(editComment({ commentId, commentBody })).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)

            })
        }
        return errors
    }


    return (

        <div>

            <form onSubmit={handleSubmit}>

            </form>

        </div>

    )
}
