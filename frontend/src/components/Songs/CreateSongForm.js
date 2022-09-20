import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSong } from '../../store/songs'
import { useHistory } from 'react-router-dom'
import './CreateSong.css'



export default function CreateSong({setModalOpen}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [albumId, setAlbumId] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        if (user) {
            setModalOpen(false)

            return dispatch(createSong({title, description, albumId, url, imageUrl})).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        }
        return setErrors(['Error'])
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, i) => (<li key={i}>{error}</li>))}
                </ul>

                <h1>
                    Create a Song
                </h1>

                <label>
                    Title
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>
                    Description
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>

                <label>
                    Album Id
                    <input type="number" value={albumId} onChange={(e) => setAlbumId(e.target.value)} />
                </label>

                <label>
                    Image Url
                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>

                <label>
                    Song Url
                    <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                </label>

                <div>
                    <button type="submit">Create New Song</button>
                    <button onClick={() => setModalOpen(false)}>Cancel</button>
                </div>

            </form>
        </div>
    )
}
