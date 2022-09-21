import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from'react-router-dom'
import { editAlbum } from '../../store/albums'
import { getOneAlbum } from '../../store/albums'
import './EditAlbum.css'




export default function EditAlbum({ setModalOpen }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const album = useSelector((state) => state.album)
    // const user = useSelector((state) => state.session.user)

    const [id, setId] = useState(album.id)
    const [title, setTitle] = useState(album.title)
    const [description, setDescription] = useState(album.description)
    const [albumId, setAlbumId] = useState(album.albumId)
    const [imageUrl, setImageUrl] = useState(album.imageUrl)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOneAlbum(id))

        return () => {
            dispatch(getOneAlbum(id))
        }
    },[dispatch, id])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        if (album) {
            setModalOpen(false)

            return dispatch(editAlbum({ id, title, description, albumId, imageUrl })).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
                // history.push(`/albums/${album.id}`)
            })
            // dispatch(editAlbum({ id, title, description, albumId, url, imageUrl }))
            // history.push(`/albums/${id}`)
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
                    Edit Album
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
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>


            <div>
                <button type="submit">Update Album</button>
                <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>


            </form>
        </div>
    )
}