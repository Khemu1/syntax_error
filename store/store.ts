// Importing the necessary functions from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing reducers
import authReducer from "./slices/authSlice"; // authSlice correctly imported
import dashboardReducer from "./slices/dashboardSlice"; // Fixing the import error

// Configure the store with the reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer, // Correct reducer assignment
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
