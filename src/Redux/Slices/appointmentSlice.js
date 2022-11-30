import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedDate: '',
    selectedTime: '',
    selectedDoctor: '',
    idDoctor: '',
    appointments: [],

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
        setAppointments(state, action) {
            state.appointments = action.payload;
        }

    },

});
export const { setSelectedDate, setSelectedTime, setSelectedDoctor, setIdDoctor, setAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;