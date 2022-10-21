import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actionResetSongs, editSong } from '../../store/songs'
import { getOneSong } from '../../store/songs'
import { getAllAlbums, actionResetAlbums } from '../../store/albums';
import { useParams } from 'react-router-dom'
import './EditSong.css'




export default function EditSong({ setModalOpen }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const song = useSelector((state) => state.song)
    const albums = useSelector((state) => state.album)
    const allAlbums = Object.values(albums)
    const user = useSelector(state => state.session.user)
    // const user = useSelector((state) => state.session.user)

    const [id, setId] = useState(song.id)
    const [title, setTitle] = useState(song.title)
    const [description, setDescription] = useState(song.description)
    const [albumId, setAlbumId] = useState('')
    const [url, setUrl] = useState(song.url)
    const [imageUrl, setImageUrl] = useState(song.imageUrl)
    const [errors, setErrors] = useState([])
    const [displayErrors, setDisplayErrors] = useState(false);

    let validate = () => {
        let validationErrors = [];

        if (title.length > 256) validationErrors.push('Title cannot exceed 256 characters')
        if (!title) validationErrors.push('Song must have a title')
        if (description.length > 256) validationErrors.push('Description cannot exceed 256 characters')
        if (!description) validationErrors.push('Song must have a description')
        if (!url.slice(-4).includes('.mp3')) validationErrors.push('Song url must be an mp3 file (ends with .mp3)')

        setErrors(validationErrors);

        if (validationErrors.length) setDisplayErrors(true)

        return validationErrors

    }


    useEffect(() => {
        if (displayErrors) validate()
    }, [title, description, url])


    useEffect(() => {
        dispatch(getOneSong(id))
        return () => dispatch(getOneSong(id))
    }, [dispatch, id])


    useEffect(() => {
        dispatch(getAllAlbums())
        return () => actionResetAlbums()
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault()


        if (!errors.length) {
            setErrors([])
            setDisplayErrors(false)
            let validationErrors = validate()
            if (validationErrors.length) return
            setModalOpen(false)

            return dispatch(editSong({ id, title, description, albumId: +albumId, url, imageUrl })).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
                // history.push(`/songs/${song.id}`)
            })
            // dispatch(editSong({ id, title, description, albumId, url, imageUrl }))
        }
        history.push(`/songs/${id}`)
        return errors
    }

    const myAlbums = allAlbums.filter(album => album.userId === user.id)

    return (
        <div className='EditSongContainer'>
            <form className='editForm' onSubmit={handleSubmit}>

                <h1>
                    Edit Song
                </h1>

                <label>
                    <input className="inputField" type="text" value={title} placeholder={title || "Enter a title"} required onChange={(e) => setTitle(e.target.value)} />
                </label>



                <label>

                    <input className="inputField" type="text" value={description} placeholder={description || "Enter a description"} required onChange={(e) => setDescription(e.target.value)} />
                </label>



                {/* <label>
                    Album Id
                    <input type="number" value={albumId} onChange={(e) => setAlbumId(e.target.value)} />
                </label> */}



                <select className='selectInputField'
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)}>
                    <option disabled={true} value="">--Choose an Album--</option>

                    {myAlbums.map(album => {

                        return (
                            <option key={album.id} value={album.id}>{album.title}</option>
                        )
                    })}
                </select>




                <label>

                    <input className="inputField" type="text" value={imageUrl} placeholder={imageUrl || "Enter an imageUrl"} onChange={(e) => setImageUrl(e.target.value)} />
                </label>



                <label>

                    <input className="inputField" type="text" value={url} placeholder={url || "Enter a url"} required onChange={(e) => setUrl(e.target.value)} />
                </label>

                <div className="signUpErrors">
                    <ul>
                        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>


                <div>
                    <button className='createButton' type="submit">Update Song</button>
                    <button className='createButton' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>


            </form>
        </div>
    )
}
