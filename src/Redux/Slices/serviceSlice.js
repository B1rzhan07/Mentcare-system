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
}


const serviceSlice = createSlice({
    name: 'department',
    initialState,


    extraReducers: {
        [fetchServices.fulfilled]: (state, action) => {
            state.services = action.payload;
        }
    }

});
export default serviceSlice.reducer;