import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteAlbum } from '../../store/albums'
import { getAllSongs, actionResetSongs } from '../../store/songs';
import { deleteSong } from '../../store/songs'
import './DeleteAlbum.css'




export default function DeleteAlbum({ setModalOpen }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const album = useSelector((state) => state.album)
    const user = useSelector((state) => state.session.user)
    // const albumId = useSelector((state) => state.albumId)
    const { albumId } = useParams();
    const songs = useSelector((state) => state.song)

    const songsArray = Object.values(songs)
    const albumSongs = songsArray.filter(songs => +songs.albumId === +albumId)

    useEffect(() => {
        dispatch(getAllSongs());
        return () => actionResetSongs();
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deleteAlbum(albumId))
        await albumSongs.forEach(song => dispatch(deleteSong(song.id)))
        setModalOpen(false)
        history.push('/albums')
    }

    return (
        <div className="delete-album">
            <form className='deleteForm' onSubmit={handleSubmit}>

                <h1>Delete Album: <p>{album.title}</p></h1>
                <h2 style={{color:"red"}}>
                    Warning: Deleting this album will also delete the album's songs
                </h2>

                <div className="buttonContainer">
                    <button className='DeleteButton' type='submit'>Confirm</button>
                    <button className='DeleteButton' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
