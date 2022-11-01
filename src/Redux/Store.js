import { configureStore } from '@reduxjs/toolkit'
import user from './Slices/userSlice';
export const store = configureStore({
    reducer: {
        user,
    },
})