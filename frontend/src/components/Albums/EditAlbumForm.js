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
    const [displayErrors, setDisplayErrors] = useState(false);

    let validate = () => {
        let validationErrors = [];

        if (title.length > 256) validationErrors.push('Title cannot exceed 256 characters')
        if (!title) validationErrors.push('Album must have a title')
        if (description.length > 256) validationErrors.push('Description cannot exceed 256 characters')
        if (!description) validationErrors.push('Album must have a description')
        if (!imageUrl) validationErrors.push('Album image is required')
        if (!imageUrl.slice(-5).includes(".png") && !imageUrl.slice(-6).includes(".jpeg") && !imageUrl.slice(-5).includes(".jpg")) validationErrors.push('Please enter a valid image (.png, .jpg, .jpeg)')
        setErrors(validationErrors);

        if (validationErrors.length) setDisplayErrors(true)

        return validationErrors

    }

    useEffect(() => {
        dispatch(getOneAlbum(id))

        return () => {
            dispatch(getOneAlbum(id))
        }
    }, [dispatch, id])


    useEffect(() => {
        if (displayErrors) validate()
        if (imageUrl === '.png' || imageUrl === '.jpg' || imageUrl === '.jpeg') setImageUrl('https://cdn4.iconfinder.com/data/icons/public-sign-part03/100/_-14-512.png')
    }, [title, description, imageUrl])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!errors.length) {
            setErrors([])
            setDisplayErrors(false)
            let validationErrors = validate()

            if (validationErrors.length) return
            if (!errors.length){
                setModalOpen(false)

                return dispatch(editAlbum({ id, title, description, imageUrl })).catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                    // history.push(`/albums/${album.id}`)
                })
                // dispatch(editAlbum({ id, title, description, albumId, url, imageUrl }))
            }
            // history.push(`/albums/${id}`)
        }
        return errors
    }
    return (
        <div className='EditAlbumContainer'>
            <form className='editForm' onSubmit={handleSubmit}>

                <div className='editText'>
                    <h1>
                        Edit Album
                    </h1>

                </div>

                <label>
                    <input className="inputField" type="text" value={title} placeholder={title || "Enter a title"} required onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>

                    <input className="inputField" type="text" value={description} placeholder={description || "Enter a description"} required onChange={(e) => setDescription(e.target.value)} />
                </label>


                <label>

                    <input className="inputField" type="text" value={imageUrl} placeholder={imageUrl || "Enter a imageUrl"} required onChange={(e) => setImageUrl(e.target.value)} />
                </label>

                <div className="signUpErrors">
                    <ul>
                        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>


                <div>
                    <button className='createButton' type="submit">Update Album</button>
                    <button className='createButton' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>


            </form>
        </div>
    )
}
