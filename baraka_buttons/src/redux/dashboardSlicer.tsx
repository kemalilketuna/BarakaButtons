import { createSlice } from "@reduxjs/toolkit";

interface Room {
    name: string;
    ip: string;
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        room: null
    },
    reducers: {
        setRoom: (state, action) => {
            state.room = action.payload;
        }
    }
});

export const { setRoom } = dashboardSlice.actions;
export default dashboardSlice.reducer;