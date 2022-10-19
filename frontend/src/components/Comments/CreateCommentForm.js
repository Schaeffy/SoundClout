import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSong } from '../../store/songs'
import { getAllAlbums } from '../../store/albums';
import { useHistory, useParams } from 'react-router-dom';
import { createComment } from '../../store/comments';



export default function CreateComment({ setModalOpen }) {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const history = useHistory()

    const {songId} = useParams()

    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        if (user) {
            setModalOpen(false)
        }
        const created = await dispatch(createComment({ songId, comment })).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        })

        // if (created) history.push('/songs')
        return setErrors(["Error"])
    }


    return (
        <div className='CreateSongContainer'>
            <form className="createForm"  onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, i) => (<li key={i}>{error}</li>))}
                </ul>


                <h1>
                    Create a Comment
                </h1>


                <div>
                    <label  className="inputField">

                        <input type="text" value={comment} placeholder='Comment' required onChange={(e) => setComment(e.target.value)} />

                    </label>
                </div>


                <div>
                    <button className='createButton' type="submit">Create a comment</button>
                    <button className='createButton'  onClick={() => setModalOpen(false)}>Cancel</button>
                </div>

            </form>
        </div>
    )
}
