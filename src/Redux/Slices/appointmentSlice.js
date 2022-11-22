import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedDate: '',
    selectedTime: '',
    selectedDoctor: '',
    idDoctor: '',
}


const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setSelectedDate(state, action) {
            state.selectedDate = action.payload;
        },
        setSelectedTime(state, action) {
            state.selectedTime = action.payload;
        },
        setSelectedDoctor(state, action) {
            state.selectedDoctor = action.payload;
        },
        setIdDoctor(state, action) {
            state.idDoctor = action.payload;
        },

    },

});
export const { setSelectedDate, setSelectedTime, setSelectedDoctor, setIdDoctor } = appointmentSlice.actions;
export default appointmentSlice.reducer;