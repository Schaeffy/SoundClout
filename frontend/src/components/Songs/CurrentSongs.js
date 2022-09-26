import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { getAllSongs, actionResetSongs } from '../../store/songs';
import CreateSongModal from './CreateSong';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'
import './Songs.css'
import { getAllAlbums } from '../../store/albums';
import { actionPlaySong } from '../../store/songPlayer'



export default function UsersSongs() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const songs = useSelector((state) => state.song)
    const allSongs = Object.values(songs)
    const allAlbums = useSelector((state) => state.album)
    const history = useHistory()

    const userSongs = allSongs.filter(song => song.userId === user.id)


    useEffect(() => {
        dispatch(getAllSongs());
        return () => dispatch(actionResetSongs())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllAlbums())
    },[dispatch])


    if (!user) {
        return (
            history.push('/')
        )
    }
    if (user) {
        return (
            <div>

                <div className='createSongContainer'>
                    <CreateSongModal />
                </div>

                <div className='titleContainer'>
                <NavLink className='titleText' to='/songs'>
                    All Songs
                    </NavLink>
                <NavLink className='titleText' to='/songs/current'>
                    My Songs
                </NavLink>

                </div>

                <div className='allSongsContainer'>

                    {userSongs.map((song) => {
                        return (
                            <div className='songCardContainer' key={song.id}>

                                <div className='songCardInnerContainer'>

                                    <div className='songCardImage'>
                                    <div className='playButtonContainer'>
                                        <img id='playButton' onClick={() => dispatch(actionPlaySong(song))} src='https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png' alt=''/>

                                    </div>

                                        <img src={song.imageUrl} alt='' />

                                    </div>

                                    <div className='songInfo'>

                                        <div>
                                            <NavLink className='songLink' to={`/songs/${song.id}`}>{song.title}</NavLink>
                                        </div>
                                        {/* <div>
                                            Artist: {song.Artist.username}
                                        </div> */}

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
