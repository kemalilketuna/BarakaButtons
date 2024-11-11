import { createSlice } from "@reduxjs/toolkit";

interface Room {
    roomName: string;
    roomIp: string;
}

interface DashboardState {
    room: Room | null;
    rooms: Room[];
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        room: null,
        rooms: []
    } as DashboardState,
    reducers: {
        setRoom: (state, action) => {
            state.room = action.payload;
        },
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
        deleteRoom: (state, action) => {
            state.rooms = state.rooms.filter((room: Room) => room.roomName !== action.payload.roomName);
        },
        addRoom: (state, action) => {
            state.rooms.push(action.payload);
        }
    }
});

export const { setRoom, setRooms, deleteRoom, addRoom } = dashboardSlice.actions;
export default dashboardSlice.reducer;