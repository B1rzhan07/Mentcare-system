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
}


const departmentSlice = createSlice({
    name: 'department',
    initialState,

    extraReducers: {
        [fetchDepartments.fulfilled]: (state, action) => {
            state.departments = action.payload;
        }
    }

});
export default departmentSlice.reducer;