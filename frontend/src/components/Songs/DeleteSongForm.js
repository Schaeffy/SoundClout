import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteSong } from '../../store/songs'
import './DeleteSong.css'




export default function DeleteSong({ setModalOpen }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const song = useSelector((state) => state.song)
    const user = useSelector((state) => state.session.user)
    // const songId = useSelector((state) => state.songId)
    const {songId} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deleteSong(songId))
        setModalOpen(false)
        history.push('/songs')
    }

    return (
        <div className="delete-song">
            <form onSubmit={handleSubmit}>
            <h1>Delete {song.title}</h1>

            <button type='submit'>Delete Song</button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>

            </form>
        </div>
    )
}
