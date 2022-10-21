import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { actionResetAlbums, getOneAlbum } from '../../store/albums'
import DeleteAlbumModal from './DeleteAlbum'
import EditAlbumModal from './EditAlbum'
import './GetOneAlbum.css'
import { actionPlaySong } from '../../store/songPlayer';


export default function AlbumDetails() {
    const dispatch = useDispatch();
    const { albumId } = useParams();

    const album = useSelector((state) => state.album)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getOneAlbum(albumId))
        return () => dispatch(actionResetAlbums())
    }, [dispatch, user, albumId])



    if (!user) {
        return null
    }
    if (!album.id) {
        return null
    }

    if (album.Artist && (!user || album.Artist.id !== user.id)) {
        return (
            <div>
                <div className='albumContainer'>

                    <div className='albumDetailsContainer'>
                        <img src={album.imageUrl} alt='' onClick={() => dispatch(actionPlaySong(album))}></img>
                        {/* <AudioPlayer
                        autoPlay={false}
                        src={album.url}
                        onPlay={e => console.log("onPlay")}
                    // other props here
                    /> */}
                        <div className='songInfoContainer'>

                            <div className='albumDetailsInfo'>
                                Album: {album.title}
                            </div>

                            <div className='albumDetailsInfo'>
                                Artist: {album.Artist.username}
                            </div>

                            <div className='albumDetailsInfo'>
                                Description: {album.description}
                            </div>

                            <div className='albumDetailsInfo'>
                                Songs: {album.Songs.map((song) => {
                                    return (
                                        <div key={song.id} >
                                            <NavLink to={`/songs/${song.id}`} id='albumSongLinks'>{song.title}</NavLink>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    <div className='artistDetailsContainer'>

                    </div>



                </div>

            </div>
        )
    }

    if (album.Artist && user && (album.Artist.id === user.id)) {
        return (
            <div>



                <div className='albumContainer'>

                    <div className='albumDetailsContainer'>
                        <img src={album.imageUrl} alt='' onClick={() => dispatch(actionPlaySong(album))}></img>
                        {/* <AudioPlayer
    autoPlay={false}
    src={album.url}
    onPlay={e => console.log("onPlay")}
// other props here
/> */}
                        <div className='songInfoContainer'>

                            <div className='albumDetailsInfo'>
                                Album: {album.title}
                            </div>

                            <div className='albumDetailsInfo'>
                                Artist: {album.Artist.username}
                            </div>

                            <div className='albumDetailsInfo'>
                                Description: {album.description}
                            </div>

                            <div className='albumDetailsInfo'>
                                Songs: {album.Songs.map((song) => {
                                    return (
                                        <div key={song.id} >
                                            <NavLink to={`/songs/${song.id}`} id='albumSongLinks'>{song.title}</NavLink>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    <div className='artistDetailsContainer'>
                        <div className='buttonContainer'>
                            <EditAlbumModal />
                            <DeleteAlbumModal />
                        </div>

                    </div>



                </div>


            </div>
        )
    }
}
