import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    isAuth: false,
    type: '',
    button: false,
    patients: [],
    doctors: [],
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setTypeof(state, action) {
            state.type = action.payload;
        },
        setButton(state, action) {
            state.button = action.payload;
        },
        setDataPatients(state, action) {
            state.patients = action.payload;
        },
        setDataDoctors(state, action) {
            state.doctors = action.payload;
        },
    }
});
export const { setUser, setIsAuth, setTypeof, setButton, setDataPatients, setDataDoctors } = userSlice.actions;
export default userSlice.reducer;