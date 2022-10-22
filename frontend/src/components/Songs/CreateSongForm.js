import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSong } from '../../store/songs'
import { getAllAlbums } from '../../store/albums';
import './CreateSong.css'
import { useHistory } from 'react-router-dom';



export default function CreateSong({ setModalOpen }) {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const albums = useSelector((state) => state.album)
    const allAlbums = Object.values(albums)
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [albumId, setAlbumId] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('https://cdn4.iconfinder.com/data/icons/public-sign-part03/100/_-14-512.png')
    const [errors, setErrors] = useState([])
    // const [selectedOption, setSelectedOption] = useState('')
    const [displayErrors, setDisplayErrors] = useState(false);

    let validate = () => {
        let validationErrors = [];

        if (!title) validationErrors.push('Song must have a title')
        if (title.length > 256) validationErrors.push('Title cannot exceed 256 characters')
        if (description.length > 256) validationErrors.push('Description cannot exceed 256 characters')
        if (!description) validationErrors.push('Song must have a description')
        if (!url.slice(-4).includes('.mp3')) validationErrors.push('Song url must be an mp3 file (ends with .mp3)')
        if (!allAlbums.filter(album => album.userId === user.id).length) validationErrors.push('Please create an album first')
        if (!imageUrl) validationErrors.push('Song image is required')
        if (!imageUrl.slice(-5).includes(".png") && !imageUrl.slice(-6).includes(".jpeg") && !imageUrl.slice(-5).includes(".jpg")) validationErrors.push('Please enter a valid image (ends with .png or .jpeg)')
        if (url === '.mp3') validationErrors.push('Please enter a valid mp3 url')
        if (albumId === "") validationErrors.push('Please select or create an album first')
        setErrors(validationErrors);

        if (validationErrors.length) setDisplayErrors(true)

        return validationErrors

    }


    useEffect(() => {
        if (displayErrors) validate()
        if (imageUrl === '.png' || imageUrl === '.jpg' || imageUrl === '.jpeg') setImageUrl('https://cdn4.iconfinder.com/data/icons/public-sign-part03/100/_-14-512.png')
    }, [title, description, url, imageUrl, albumId])



    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!errors.length) {
            setErrors([])
            setDisplayErrors(false)
            let validationErrors = validate()

            if (validationErrors.length) return
            if (!errors.length) {

                setModalOpen(false)

                const created = await dispatch(createSong({ title, description, albumId, url, imageUrl })).catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                })
                if (created) history.push('/songs')
            }
            return errors
        }
    }



    // const handleChange = (e) => {
    //     setSelectedOption(e.target.value)
    //     setAlbumId(e.target.value)
    // }

    const myAlbums = allAlbums.filter(album => album.userId === user.id)

    return (
        <div className='CreateSongContainer'>
            <form className="createForm" onSubmit={handleSubmit}>


                <h1>
                    Create a Song
                </h1>

                <label  >
                    <input type="text" value={title} placeholder='Title' className="inputField" required onChange={(e) => setTitle(e.target.value)} />
                </label>



                <label>
                    <input type="text" value={description} placeholder='Description' className="inputField" required onChange={(e) => setDescription(e.target.value)} />
                </label>



                {/* <label>
                    Album Id
                    <input type="number" value={albumId} onChange={(e) => setAlbumId(e.target.value)} />
                </label> */}

                {/* <select>
                {allAlbums.map((album) => {return (
                    <option value={album.id} onChange={(e)=> setAlbumId(e.target.value)}>{album.title}</option>
                )})}
                </select> */}

                {/* <select value={albumId} onChange={e => setAlbumId(e.target.value)}>
                {allAlbums.map((album) => {return (
                    <option key={album.id} value={album.id}>{album.title}</option>
                )})}
                </select> */}


                <select className='selectSongInputField'
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)}>
                    <option selected disabled={true} value="">--Choose an Album--</option>
                    {myAlbums.map(album => {

                        return (
                            <option key={album.id} value={album.id}>{album.title}</option>
                        )
                    })}
                </select>


                {/* <select
                    value={selectedOption}
                    onChange={handleChange}>
                    <option disabled={true} value="">--Choose an Album--</option>
                    {allAlbums.map(o => (
                        <option key={o.id} value={o.id}>{o.title}</option>
                    ))}
                </select> */}




                <label>
                    <input type="text" value={imageUrl} placeholder='Image Url' className="inputField" required onChange={(e) => setImageUrl(e.target.value)} />
                </label>




                <label>
                    <input type="text" required value={url} placeholder='Song Url' className="inputField" onChange={(e) => setUrl(e.target.value)} />
                </label>

                <div className="signUpErrors">
                    <ul>
                        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>


                <div>
                    <button className='createButton' type="submit">Create New Song</button>
                    <button className='createButton' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>

            </form>
        </div>
    )
}
