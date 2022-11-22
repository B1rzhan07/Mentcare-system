import { configureStore } from '@reduxjs/toolkit'
import user from './Slices/userSlice';
import department from './Slices/departmentSlice';
import service from './Slices/serviceSlice';
import appointment from './Slices/appointmentSlice';
export const store = configureStore({
    reducer: {
        user,
        department,
        service,
        appointment,

    },
})