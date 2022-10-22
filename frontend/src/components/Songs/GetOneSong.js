import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { actionResetSongs, getOneSong } from '../../store/songs'
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
        return () => dispatch(actionResetSongs())
    }, [dispatch, user, songId])



    if (!song.id) {
        return null
    }

    if (song.Artist && song.Album && (!user || song.Artist.id !== user.id)) {
        return (
            <div>

                <div className='songContainer'>

                    <div className='songDetailsContainer'>

                        <div className='songInfoContainer'>

                            <div className='songPlayContainer'>

                                <img id='songPagePlayButton' onClick={() => dispatch(actionPlaySong(song))} src='https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png' alt='' />

                                <div className='songPlayInfoContainer'>

                                    <div className='songDetailsInfo' id='songDetailsTitle'>
                                        <p>
                                            <span>
                                                {song.title}
                                            </span>
                                        </p>
                                    </div>

                                    <div className='songDetailsInfo' id='songDetailsArtist'>
                                        <p>
                                            <span>
                                                {song.Artist.username}
                                            </span>
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className='songOtherInfoContainer'>

                                <div className='songDetailsInfo'>
                                    Album: {song.Album.title}
                                </div>


                                <div className='songDetailsInfo'>
                                    Description: {song.description}
                                </div>

                            </div>

                        </div>

                        {/* <div className='songImage'> */}
                        <span className='songArtContainer'>
                            <img src={song.imageUrl} className='songArt' alt='' ></img>
                        </span>
                        {/* <AudioPlayer
                        autoPlay={false}
                        src={song.url}
                        onPlay={e => console.log("onPlay")}
                    // other props here
                    /> */}
                        {/* </div> */}

                    </div>

                    <div className='artistDetailsContainer'>

                        {/* <div className='songDetailsInfo'>
                            Artist: {song.Artist.username}
                        </div> */}

                    </div>


                </div>

            </div>
        )
    }

    if (song.Artist && user && (song.Artist.id === user.id)) {
        return (
            <div>

                <div className='songContainer'>

                    <div className='songDetailsContainer'>

                        <div className='songInfoContainer'>

                            <div className='songPlayContainer'>

                                <img id='songPagePlayButton' onClick={() => dispatch(actionPlaySong(song))} src='https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png' alt='' />

                                <div className='songPlayInfoContainer'>

                                    <div className='songDetailsInfo' id='songDetailsTitle'>
                                        <p>
                                            <span>
                                                {song.title}
                                            </span>
                                        </p>
                                    </div>

                                    <div className='songDetailsInfo' id='songDetailsArtist'>
                                        <p>
                                            <span>
                                                {song.Artist.username}
                                            </span>
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className='songOtherInfoContainer'>

                                <div className='songDetailsInfo'>
                                    Album: {song.Album ? song.Album.title : ""}
                                </div>


                                <div className='songDetailsInfo'>
                                    Description: {song.description}
                                </div>

                            </div>

                        </div>

                        {/* <div className='songImage'> */}

                        <span className='songArtContainer'>
                            <img src={song.imageUrl} className='songArt' alt='' onClick={() => dispatch(actionPlaySong(song))}></img>
                        </span>

                        {/* <AudioPlayer
                        autoPlay={false}
                        src={song.url}
                        onPlay={e => console.log("onPlay")}
                    // other props here
                    /> */}
                        {/* </div> */}

                    </div>

                    <div className='artistDetailsContainer'>

                        <div className='buttonContainer'>
                            <EditSongModal />
                            <DeleteSongModal />
                        </div>

                        <div className='songDetailsInfo'>
                            {/* Artist: {song.Artist.username} */}
                        </div>

                    </div>


                </div>

            </div>
        )
    }

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
