import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        room: null,
        rooms: []
    },
    reducers: {
        setRoom: (state, action) => {
            state.room = action.payload;
        },
        setRooms: (state, action) => {
            state.rooms = action.payload;
        }
    }
});

export const { setRoom, setRooms } = dashboardSlice.actions;
export default dashboardSlice.reducer;