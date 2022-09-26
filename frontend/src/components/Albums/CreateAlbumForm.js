import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAlbum } from '../../store/albums'
import { useHistory } from 'react-router-dom'
import './CreateAlbum.css'



export default function CreateAlbum({setModalOpen}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        if (user) {
            setModalOpen(false)

            return dispatch(createAlbum({title, description, imageUrl})).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        }
        return setErrors(['Error'])
    }
    return (
        <div className='createAlbumContainer'>
            <form className='createForm' onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, i) => (<li key={i}>{error}</li>))}
                </ul>

                <h1>
                    Create an Album
                </h1>

                <label>

                    <input  placeholder='Title' className="inputField" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>

                    <input  placeholder='Description' className="inputField" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>


                <label>

                    <input placeholder='Image Url' className="inputField" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>


                <div>
                    <button className='createButton' type="submit">Create New Album</button>
                    <button className='createButton' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>

            </form>
        </div>
    )
}
