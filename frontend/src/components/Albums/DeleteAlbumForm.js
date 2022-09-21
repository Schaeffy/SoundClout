import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteAlbum } from '../../store/albums'
import './DeleteAlbum.css'




export default function DeleteAlbum({ setModalOpen }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const album = useSelector((state) => state.album)
    const user = useSelector((state) => state.session.user)
    // const albumId = useSelector((state) => state.albumId)
    const {albumId} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deleteAlbum(albumId))
        setModalOpen(false)
        history.push('/albums')
    }

    return (
        <div className="delete-album">
            <form onSubmit={handleSubmit}>
            <h1>Delete {album.title}</h1>

            <button type='submit'>Delete Album</button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>

            </form>
        </div>
    )
}
