import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userBooks: localStorage.getItem('userBooks')
        ? JSON.parse(localStorage.getItem('userBooks')) : null,
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBooksDetails: (state, action) => {
            state.userBooks = action.payload
            localStorage.setItem("userBooks", JSON.stringify(action.payload))
        },
        onUserLogout: (state, action) => {
            state.userBooks = null
            localStorage.removeItem("userBooks")
        }
    }
})

export const { setBooksDetails, onUserLogout } = bookSlice.actions
export default bookSlice.reducer