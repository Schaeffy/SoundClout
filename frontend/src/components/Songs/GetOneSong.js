import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getOneSong } from '../../store/songs'
import DeleteSongModal from './DeleteSong'
import EditSongModal from './EditSong'

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { actionPlaySong } from '../../store/songPlayer'

import './GetOneSong.css'


export default function SongDetails() {
    const dispatch = useDispatch();
    const { songId } = useParams();

    const song = useSelector((state) => state.song)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getOneSong(songId))
    }, [dispatch, user, songId])



    if (!song.id) {
        return (
            <div>
                Another Error
            </div>
        )
    }

    if (song.Artist && song.Album) {
        return (
            <div>

                <div>
                    <EditSongModal />
                    <DeleteSongModal />
                </div>

                <div>

                    <img src={song.imageUrl} alt='' onClick={() => dispatch(actionPlaySong(song))}></img>
                    {/* <AudioPlayer
                        autoPlay={false}
                        src={song.url}
                        onPlay={e => console.log("onPlay")}
                    // other props here
                    /> */}

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
                        Album: {song.Album.title}
                    </div>

                </div>

            </div>
        )
    }

    // if (song.Artist && song.Album && song.Artist.id === user.id) {
    //     return (
    //         <div>

    //             <div>
    //                 <EditSongModal />
    //                 <DeleteSongModal />
    //             </div>

    //             <div>

    //                 <img src={song.imageUrl} alt='' onClick={() => dispatch(actionPlaySong(song))}></img>
    //                 {/* <AudioPlayer
    //                     autoPlay={false}
    //                     src={song.url}
    //                     onPlay={e => console.log("onPlay")}
    //                 // other props here
    //                 /> */}

    //                 <div>
    //                     Song: {song.title}
    //                 </div>

    //                 <div>
    //                     Artist: {song.Artist.username}
    //                 </div>

    //                 <div>
    //                     Description: {song.description}
    //                 </div>

    //                 <div>
    //                     Album: {song.Album.title}
    //                 </div>

    //             </div>

    //         </div>
    //     )
    // }

    // if (song.Artist && song.Album && song.Artist.id !== user.id) {
    //     return (
    //         <div>

    //             <div>

    //                 <img src={song.imageUrl} alt='' onClick={() => dispatch(actionPlaySong(song))}></img>
    //                 {/* <AudioPlayer
    //                     autoPlay={false}
    //                     src={song.url}
    //                     onPlay={e => console.log("onPlay")}
    //                 // other props here
    //                 /> */}

    //                 <div>
    //                     Song: {song.title}
    //                 </div>

    //                 <div>
    //                     Artist: {song.Artist.username}
    //                 </div>

    //                 <div>
    //                     Description: {song.description}
    //                 </div>

    //                 <div>
    //                     Album: {song.Album.title}
    //                 </div>

    //             </div>

    //         </div>
    //     )
    // }
}
