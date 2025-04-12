import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.ts';
import dietReducer from '../features/diet/dietSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    diet: dietReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 