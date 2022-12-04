import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async() => {
        const { data } = await axios.get('/myPage/admin', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
        });
        return data;
    }
)
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

    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            state.patients = action.payload.patients;
            state.doctors = action.payload.doctors;
        }
    }
});
export const { setUser, setIsAuth, setTypeof, setButton, setDataPatients, setDataDoctors } = userSlice.actions;
export default userSlice.reducer;