import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
    const [imageUrl, setImageUrl] = useState(album.imageUrl)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOneAlbum(id))

        return () => {
            dispatch(getOneAlbum(id))
        }
    }, [dispatch, id])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        if (album) {
            setModalOpen(false)

            return dispatch(editAlbum({ id, title, description, imageUrl })).catch(async (res) => {
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
        <div className='EditAlbumContainer'>
            <form className='editForm' onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, i) => (<li key={i}>{error}</li>))}
                </ul>

                <div className='editText'>
                    <h1>
                        Edit Album
                    </h1>

                </div>

                <label>
                    <input className="inputField" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>

                    <input className="inputField" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>


                <label>

                    <input className="inputField" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>


                <div>
                    <button className='editButton' type="submit">Update Album</button>
                    <button className='editButton' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>


            </form>
        </div>
    )
}
