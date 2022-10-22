import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAlbum } from '../../store/albums'
import { useHistory } from 'react-router-dom'
import './CreateAlbum.css'



export default function CreateAlbum({ setModalOpen }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('https://cdn4.iconfinder.com/data/icons/public-sign-part03/100/_-14-512.png')
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
            if (!errors.length) {
                setModalOpen(false)


                if (user) {
                    setModalOpen(false)

                    return dispatch(createAlbum({ title, description, imageUrl })).catch(async (res) => {
                        const data = await res.json()
                        if (data && data.errors) setErrors(data.errors)
                    })
                }
                return errors
            }
        }
    }


    return (
        <div className='createAlbumContainer'>
            <form className='createForm' onSubmit={handleSubmit}>

                <h1>
                    Create an Album
                </h1>

                <label>
                    <input placeholder='Title' className="inputField" type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>

                    <input placeholder='Description' className="inputField" type="text" value={description} required onChange={(e) => setDescription(e.target.value)} />
                </label>


                <label>

                    <input placeholder='Image Url' className="inputField" type="text" value={imageUrl} required onChange={(e) => setImageUrl(e.target.value)} />
                </label>

                <div className="signUpErrors">
                    <ul>
                        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>


                <div>
                    <button className='createButton' type="submit">Create New Album</button>
                    <button className='createButton' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>

            </form>
        </div>
    )
}
