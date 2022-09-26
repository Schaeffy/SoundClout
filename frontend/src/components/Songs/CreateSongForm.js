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
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([])
    // const [selectedOption, setSelectedOption] = useState('')


    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        if (user) {
            setModalOpen(false)
        }
        const created = await dispatch(createSong({ title, description, albumId, url, imageUrl })).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        })

        if (created) history.push('/songs')
        return setErrors(["Error"])
    }



    // const handleChange = (e) => {
    //     setSelectedOption(e.target.value)
    //     setAlbumId(e.target.value)
    // }

    const myAlbums = allAlbums.filter(album => album.userId === user.id)

    return (
        <div className='CreateSongContainer'>
            <form className="createForm"  onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, i) => (<li key={i}>{error}</li>))}
                </ul>

                <h1>
                    Create a Song
                </h1>
                <div>
                    <label  className="inputField">

                        <input type="text" value={title} placeholder='Title' required onChange={(e) => setTitle(e.target.value)} />
                    </label>

                </div>
                <div>
                    <label  className="inputField">
                        <input type="text" value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                    </label>

                </div>

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
                <div>

                    <select className='selectInputField'
                        value={albumId}
                        required
                        onChange={(e) => setAlbumId(e.target.value)}>
                        <option selected disabled={true} value="">--Choose an Album--</option>
                        {myAlbums.map(album => {

                            return (
                                <option key={album.id} value={album.id}>{album.title}</option>
                            )
                        })}
                    </select>
                </div>

                {/* <select
                    value={selectedOption}
                    onChange={handleChange}>
                    <option disabled={true} value="">--Choose an Album--</option>
                    {allAlbums.map(o => (
                        <option key={o.id} value={o.id}>{o.title}</option>
                    ))}
                </select> */}


                <div>

                    <label  className="inputField">
                        <input type="text" value={imageUrl}  placeholder='Image Url' onChange={(e) => setImageUrl(e.target.value)} />
                    </label>
                </div>

                <div>

                    <label  className="inputField">
                        <input type="text" required value={url}  placeholder='Song Url' onChange={(e) => setUrl(e.target.value)} />
                    </label>
                </div>

                <div>
                    <button className='createButton' type="submit">Create New Song</button>
                    <button className='createButton'  onClick={() => setModalOpen(false)}>Cancel</button>
                </div>

            </form>
        </div>
    )
}
