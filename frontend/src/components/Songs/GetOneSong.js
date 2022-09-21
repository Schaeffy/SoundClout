import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getOneSong } from '../../store/songs'


export default function SongDetails () {
    const dispatch = useDispatch();
    const {songId} = useParams();

    const song = useSelector((state) => state.song)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getOneSong(songId))
    },[dispatch, user, songId])





    if (!user) {
        return (
        <div>
            Error
        </div>
        )
    }
    if (!song.id) {
        return (
            <div>
                Another Error
            </div>
        )
    }

    if(!song.Artist || !song.Album) {
        return (
            <div>
                Erroring
            </div>
        )
    }

    if (song.Artist && song.Album) {
        return (
            <div>
                <div>
                    <img src={song.imageUrl} alt=''></img>
                    <div>
                        Song: {song.title}
                    </div>
                    <div>
                        Artist: {song.Artist.username}
                    </div>
                    <div>
                        Description: {song.description}
                    </div>
                    <div>
                        Album: {song.Album.id}
                    </div>
                </div>
            </div>
        )
    }
}
