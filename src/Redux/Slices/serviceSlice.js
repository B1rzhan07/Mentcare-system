import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchServices = createAsyncThunk(
    'services/fetchByDepartmentId',
    async() => {
        const response = await axios.get('/services');
        return response.data;
    }
)
const initialState = {
    services: [],
    time: [],
    serviceDoctor: [],
    info_doctor: [],
}


const serviceSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        addTime: (state, action) => {
            state.time.push(action.payload)
        },
        addServiceDoctor: (state, action) => {
            state.serviceDoctor.push(action.payload)
        },
        addInfoDoctor: (state, action) => {
            state.info_doctor = action.payload
        },

    },


    extraReducers: {
        [fetchServices.fulfilled]: (state, action) => {
            state.services = action.payload;
        }
    }

});
export const { addTime, addServiceDoctor, addInfoDoctor } = serviceSlice.actions;

export default serviceSlice.reducer;