const PLAY_SONG = 'SongPlayer/Song'

export const actionPlaySong = (song) => {
    return {
        type: PLAY_SONG,
        song
    }
}

const initialState = {}

export const songPlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_SONG:
            const newState = {...action.song}
            return newState
        default:
            return state
    }
}
