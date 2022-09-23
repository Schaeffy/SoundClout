import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSong } from '../../store/songs'
import { getAllAlbums } from '../../store/albums';
import './CreateSong.css'



export default function CreateSong({ setModalOpen }) {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const albums = useSelector((state) => state.album)
    const allAlbums = Object.values(albums)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [albumId, setAlbumId] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([])
    // const [selectedOption, setSelectedOption] = useState('')


    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch, user]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        if (user) {
            setModalOpen(false)

            return dispatch(createSong({ title, description, albumId, url, imageUrl })).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        }
        return setErrors(["Error"])
    }

    // const handleChange = (e) => {
    //     setSelectedOption(e.target.value)
    //     setAlbumId(e.target.value)
    // }

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

                <select
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)}>
                    <option selected disabled={true} value="">--Choose an Album--</option>
                    {allAlbums.map(album => {

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
                    Image Url
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>

                <label>
                    Song Url
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                </label>

                <div>
                    <button type="submit">Create New Song</button>
                    <button onClick={() => setModalOpen(false)}>Cancel</button>
                </div>

            </form>
        </div>
    )
}
