import { createSlice } from "@reduxjs/toolkit"
import { TypePlaylistPost } from "../../types/typePlaylist"

const initialState = {
    playLists: [],
    playListAdd : [],
    playListById: <TypePlaylistPost>{}
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
        getPlaylistById:(state, { payload }) => {
            state.playListById = payload
        },
    }
})

export const playlistAction = playlistSlice.actions
export default playlistSlice