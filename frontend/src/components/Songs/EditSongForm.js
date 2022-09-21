import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editSong } from '../../store/songs'
import './EditSong.css'




export default function EditSong({ setModalOpen }) {
    const dispatch = useDispatch()
    const song = useSelector((state) => state.song)
    const user = useSelector((state) => state.session.user)

    const [id, setId] = useState(song.id)
    const [title, setTitle] = useState(song.title)
    const [description, setDescription] = useState(song.description)
    const [albumId, setAlbumId] = useState(song.albumId)
    const [url, setUrl] = useState(song.url)
    const [imageUrl, setImageUrl] = useState(song.imageUrl)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        if (song) {
            setModalOpen(false)

            return dispatch(editSong({ id, title, description, albumId, url, imageUrl })).catch(async (res) => {
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
                    Edit Song
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
                <button type="submit">Update Song</button>
                <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>


            </form>
        </div>
    )
}
