import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getOneAlbum } from '../../store/albums'
import DeleteAlbumModal from './DeleteAlbum'
import EditAlbumModal from './EditAlbum'
import './GetOneAlbum.css'


export default function AlbumDetails () {
    const dispatch = useDispatch();
    const {albumId} = useParams();

    const album = useSelector((state) => state.album)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getOneAlbum(albumId))
    },[dispatch, user, albumId])



    if (!user) {
        return (
        <div>
            Error
        </div>
        )
    }
    if (!album.id) {
        return (
            <div>
                Another Error
            </div>
        )
    }

    // if(!album.Artist || !album.Songs) {
    //     return (
    //         <div>
    //             Erroring
    //         </div>
    //     )
    // }

    if (album.Artist && album.Songs) {
        return (
            <div>

            <div>
                <EditAlbumModal />
                <DeleteAlbumModal />
            </div>

                <div>

                    <img src={album.imageUrl} alt=''></img>

                    <div>
                        Album: {album.title}
                    </div>

                    <div>
                        Artist: {album.Artist.username}
                    </div>

                    <div>
                        Description: {album.description}
                    </div>

                    <div>
                        Songs: {album.Songs.map((song) => {
                            return(
                                <div key={song.id}>
                                <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>
        )
    }
}
