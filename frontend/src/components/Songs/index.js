import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllSongs } from '../../store/songs';
import CreateSongModal from './CreateSong';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'
import './Songs.css'
import { getAllAlbums } from '../../store/albums';


export default function AllSongs() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const songs = useSelector((state) => state.song)
    const allSongs = Object.values(songs)
    const allAlbums = useSelector((state) => state.album)


    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(getAllAlbums())
    },[dispatch])


    if (!user) {
        return (

            <div>

                <h1>
                    Error
                </h1>

            </div>
        )
    }
    if (!songs.Album || !songs.Artist) {
        return (
            <div>

                <div>
                    <CreateSongModal />
                </div>

                <h1>
                    All Songs
                </h1>

                <div className='allSongsContainer'>

                    {allSongs.map((song) => {
                        return (
                            <div className='songCardContainer' key={song.id}>

                                <div className='songCardInnerContainer'>

                                    <div className='songCardImage'>

                                        <img src={song.imageUrl} alt='' />

                                    </div>

                                    <div className='songInfo'>

                                        <div>
                                            Title: <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                                        </div>
                                        <div>
                                            Artist: {song.Artist.username}
                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    })}

                </div>

            </div>
        )
    }
}
