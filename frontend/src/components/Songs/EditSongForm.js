import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actionResetSongs, editSong } from '../../store/songs'
import { getOneSong } from '../../store/songs'
import { getAllAlbums } from '../../store/albums';
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
    const [albumId, setAlbumId] = useState(song.albumId)
    const [url, setUrl] = useState(song.url)
    const [imageUrl, setImageUrl] = useState(song.imageUrl)
    const [errors, setErrors] = useState([])

    console.log("song state data:", song)
    console.log(albumId)

    useEffect(() => {
        dispatch(getOneSong(id))
        return () => dispatch(getOneSong(id))
    }, [dispatch, id])


    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        if (song) {
            setModalOpen(false)

            return dispatch(editSong({ id, title, description, albumId:+albumId, url, imageUrl })).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
                // history.push(`/songs/${song.id}`)
            })
            // dispatch(editSong({ id, title, description, albumId, url, imageUrl }))
        }
        // history.push(`/songs/${id}`)
        return setErrors(['Error'])
    }

    const myAlbums = allAlbums.filter(album => album.userId === user.id)

    return (
        <div className='EditSongContainer'>
            <form className='editForm' onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, i) => (<li key={i}>{error}</li>))}
                </ul>

                <h1>
                    Edit Song
                </h1>
                <div>
                    <label className="inputField" >
                        Title
                        <input className="inputField" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                </div>

                <div>
                    <label className="inputField" >
                        Description
                        <input className="inputField" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>

                </div>

                {/* <label>
                    Album Id
                    <input type="number" value={albumId} onChange={(e) => setAlbumId(e.target.value)} />
                </label> */}

                <div>

                    <select className='selectInputField'
                        value={albumId}
                        required
                        onChange={(e) => setAlbumId(e.target.value)}>
                        {/* <option disabled={true} value="">--Choose an Album--</option> */}

                        {myAlbums.map(album => {

                            return (
                                <option key={album.id} value={album.id}>{album.title}</option>
                            )
                        })}
                    </select>
                </div>

                <div>

                    <label className="inputField" >
                        Image Url
                        <input className="inputField" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    </label>
                </div>

                <div>
                    <label className="inputField" >
                        Song Url
                        <input className="inputField" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </label>

                </div>

                <div>
                    <button className='createButton' type="submit">Update Song</button>
                    <button className='createButton' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>


            </form>
        </div>
    )
}
