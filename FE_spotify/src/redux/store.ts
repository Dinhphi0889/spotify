import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice";

const rootReducer = combineReducers({
    currentUser: userSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefauldMiddlware => getDefauldMiddlware())
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch