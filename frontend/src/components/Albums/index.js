import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllAlbums } from '../../store/albums';
import CreateAlbumModal from './CreateAlbum';


export default function AllAlbums() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const albums = useSelector((state) => state.album)
    const allAlbums = Object.values(albums)


    useEffect(() => {
        dispatch(getAllAlbums())
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
                    <CreateAlbumModal />
                </div>

                <h1>
                    All Albums
                </h1>

                {allAlbums.map((album) => {
                    return (
                        <NavLink to={`/albums/${album.id}`}>{album.title}</NavLink>
                    )
                })}

            </div>
        )
    }
}
