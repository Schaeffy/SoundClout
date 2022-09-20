import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/getAllSongs';

const GET_ONE_SONG = 'songs/getOneSong';

const CREATE_A_SONG = 'songs/createSong';

const EDIT_A_SONG = 'songs/editSong';

const DELETE_A_SONG = 'songs/deleteSong';

const GET_USER_SONGS = 'songs/getUserSongs';



//actions

//get all songs
const actionGetSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        songs
    }
}

//get one song

const actionGetOneSong = (song) => {
    return {
        type: GET_ONE_SONG,
        song
    }
}

//get user songs

const actionGetUserSongs = (songs) => {
    return {
        type: GET_USER_SONGS,
        songs
    }
}

//create a song

const actionCreateSong = (song) => {
    return {
        type: CREATE_A_SONG,
        song
    }
}

//edit a song

const actionEditSong = (song) => {
    return {
        type: EDIT_A_SONG,
        song
    }
}

//delete a song

const actionDeleteSong = (song) => {
    return {
        type: DELETE_A_SONG,
        song
    }
}




//thunks

//get all songs

export const getAllSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs')
    if (response.ok) {
        const allSongs = await response.json()
        await dispatch(actionGetSongs(allSongs))
    }
}

//get one song

export const getOneSong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`)
    if (response.ok) {
        const oneSong = await response.json()
        await dispatch(actionGetOneSong(oneSong))
    }
}

// get all songs by user

export const getUserSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs/current')
    if (response.ok) {
        const userSongs = await response.json()
        await dispatch(actionGetUserSongs(userSongs))
        return userSongs
    }
}

//create a song

export const createSong = (song) => async dispatch => {
    const response = await csrfFetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const createdSong = await response.json()
        await dispatch(actionCreateSong(createdSong))
    }
}

//edit a song

export const editSong = (song) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const editedSong = await response.json()
        await dispatch(actionEditSong(editedSong))
    }
}

//delete a song

export const deleteSong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const deletedSong = await response.json()
        await dispatch(actionDeleteSong(songId))
        return deletedSong
    }
}


const initialState = {};

export const songReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_SONGS: {
            const newState = {};
            action.songs.Songs.forEach(song => {
                newState[song.id] = song
            })
            return newState
        }

        case GET_ONE_SONG: {
            const newState = { ...action.song };
            return newState
        }

        case GET_USER_SONGS: {
            const newState = {};
            action.songs.Songs.forEach(song => {
                newState[song.id] = song
            })
            return newState
        }

        case CREATE_A_SONG: {
            const newState = { ...state };
            newState[action.song.id] = action.song
            return newState
        }

        case EDIT_A_SONG: {
            const newState = { ...state };
            newState[action.song.id] = action.song
            return newState;
        }

        case DELETE_A_SONG: {
            const newState = { ...state };
            delete newState[action.song.id]
            return newState
        }

        default:
            return state
    }
}
