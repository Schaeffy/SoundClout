import { csrfFetch } from "./csrf";

const GET_ALL_ALBUMS = 'albums/getAllAlbums';

const GET_ONE_ALBUM = 'albums/getOneAlbum';

const CREATE_A_ALBUM = 'albums/createAlbum';

const EDIT_A_ALBUM = 'albums/editAlbum';

const DELETE_A_ALBUM = 'albums/deleteAlbum';

const GET_USER_ALBUMS = 'albums/getUserAlbums';



//actions

//get all albums
const actionGetAlbums = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        albums
    }
}

//get one album

const actionGetOneAlbum = (album) => {
    return {
        type: GET_ONE_ALBUM,
        album
    }
}

//get user albums

const actionGetUserAlbums = (albums) => {
    return {
        type: GET_USER_ALBUMS,
        albums
    }
}

//create a album

const actionCreateAlbum = (album) => {
    return {
        type: CREATE_A_ALBUM,
        album
    }
}

//edit a album

const actionEditAlbum = (album) => {
    return {
        type: EDIT_A_ALBUM,
        album
    }
}

//delete a album

const actionDeleteAlbum = (album) => {
    return {
        type: DELETE_A_ALBUM,
        album
    }
}




//thunks

//get all albums

export const getAllAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums')
    if (response.ok) {
        const allAlbums = await response.json()
        await dispatch(actionGetAlbums(allAlbums))
    }
}

//get one album

export const getOneAlbum = (albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${albumId}`)
    if (response.ok) {
        const oneAlbum = await response.json()
        await dispatch(actionGetOneAlbum(oneAlbum))
    }
}

// get all albums by user

export const getUserAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums/current')
    if (response.ok) {
        const userAlbums = await response.json()
        await dispatch(actionGetUserAlbums(userAlbums))
        return userAlbums
    }
}

//create a album

export const createAlbum = (album) => async dispatch => {
    const response = await csrfFetch('/api/albums/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    })
    if (response.ok) {
        const createdAlbum = await response.json()
        await dispatch(actionCreateAlbum(createdAlbum))
    }
}

//edit a album

export const editAlbum = (album) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${album.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    })
    if (response.ok) {
        const editedAlbum = await response.json()
        await dispatch(actionEditAlbum(editedAlbum))
    }
}

//delete a album

export const deleteAlbum = (albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const deletedAlbum = await response.json()
        await dispatch(actionDeleteAlbum(albumId))
        return deletedAlbum
    }
}


const initialState = {};

export const albumReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_ALBUMS: {
            const newState = {};
            action.albums.Albums.forEach(album => {
                newState[album.id] = album
            })
            return newState
        }

        case GET_ONE_ALBUM: {
            const newState = { ...action.album };
            return newState
        }

        case GET_USER_ALBUMS: {
            const newState = {};
            action.albums.Albums.forEach(album => {
                newState[album.id] = album
            })
            return newState
        }

        case CREATE_A_ALBUM: {
            const newState = { ...state };
            newState[action.album.id] = action.album
            return newState
        }

        case EDIT_A_ALBUM: {
            const newState = { ...state };
            newState[action.album.id] = action.album
            return newState;
            // return {
            //     ...state,
            //     [action.album.id]: action.album
            // }
        }

        case DELETE_A_ALBUM: {
            const newState = { ...state };
            delete newState[action.album.id]
            return newState
        }

        default:
            return state
    }
}
