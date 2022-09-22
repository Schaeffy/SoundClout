import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllSongs } from '../../store/songs';
import CreateSongModal from './CreateSong';
import  AudioPlayer  from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'


export default function AllSongs() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const songs = useSelector((state) => state.song)
    const allSongs = Object.values(songs)


    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch, user]);


    if (!user) {
        return (

            <div>

                <h1>
                    Error
                </h1>

            </div>
        )
    }
    else {
        return (
            <div>

                <div>
                    <CreateSongModal />
                </div>

                <h1>
                    All Songs
                </h1>

                {allSongs.map((song) => {
                    return (
                        <div>
                            <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                            <AudioPlayer
                                autoPlay={false}
                                src={song.url}
                                onPlay={e => console.log("onPlay")}
                            // other props here
                            />
                        </div>


                    )
                })}

            </div>
        )
    }
}
