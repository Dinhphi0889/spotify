import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    playLists: [],
    playListAdd : []
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlayList: (state, { payload }) => {
            state.playListAdd = payload
        },
        getPlaylist: (state, { payload }) => {
            state.playLists = payload
        },
    }
})

export const playlistAction = playlistSlice.actions
export default playlistSlice