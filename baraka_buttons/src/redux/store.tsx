import { configureStore } from '@reduxjs/toolkit';
import dashboardSlicer from './dashboardSlicer';

export const store = configureStore({
    reducer: {
        dashboard: dashboardSlicer
    }
});

export type RootState = ReturnType<typeof store.getState>;