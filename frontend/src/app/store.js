import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice'
import booksReducer from '../features/books/bookSlice'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        books: booksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;