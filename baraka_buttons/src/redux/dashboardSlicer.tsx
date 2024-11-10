import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        value: "add"
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setValue } = dashboardSlice.actions;
export default dashboardSlice.reducer;