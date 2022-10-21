import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Link } from 'react-router-dom'
import { getAllSongs, actionResetSongs } from '../../store/songs';
import CreateSongModal from './CreateSong';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'
import './Songs.css'
import { getAllAlbums } from '../../store/albums';
import { actionPlaySong } from '../../store/songPlayer'



export default function AllSongs() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const songs = useSelector((state) => state.song)
    const allSongs = Object.values(songs)
    const allAlbums = useSelector((state) => state.album)
    const history = useHistory()

    // const userSongs = allSongs.filter(song => song.userId === user.id)
    let mySongs


    useEffect(() => {
        dispatch(getAllSongs());
        return () => dispatch(actionResetSongs())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])


    if (!user) {
        return (
            history.push('/')
        )
    }
    if (!songs.Album && !songs.Artist) {
        return (
            <div style={{ backgroundColor: 'white' }}>

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

                    {allSongs.map((song) => {
                        return (
                            <div className='songCardContainer' key={song.id}>

                                <div className='songCardInnerContainer'>

                                    <div className='songCardImage'>

                                        <div className='playButtonContainer'>
                                            <img id='playButton' onClick={() => dispatch(actionPlaySong(song))} src='https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png' alt='' />
                                        </div>

                                        <Link to={`/songs/${song.id}`}>
                                            <img src={song.imageUrl} alt='' />
                                        </Link>

                                    </div>

                                    <div key={song.id} className='songInfo'>

                                        <div key={song.id}>
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
