import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import user from './Slices/userSlice';
import department from './Slices/departmentSlice';
import service from './Slices/serviceSlice';
import appointment from './Slices/appointmentSlice';
import { combineReducers } from 'redux';
const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    user,
    department,
    service,
    appointment
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})



export const persistor = persistStore(store);