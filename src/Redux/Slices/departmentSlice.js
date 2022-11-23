import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchDepartments = createAsyncThunk(
    'departmement/fetchByDepartmentId',
    async() => {
        const response = await axios.get('/departments');
        return response.data;
    }
)
const initialState = {
    departments: [],
    name: '',
    doctor: [],
}


const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload;
        },
        setDoctor(state, action) {
            state.doctor = action.payload;
        },


    },

    extraReducers: {
        [fetchDepartments.fulfilled]: (state, action) => {
            state.departments = action.payload;
        }
    }

});
export const { setName, setDoctor } = departmentSlice.actions;

export default departmentSlice.reducer;