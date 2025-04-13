import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/model/authSlice.ts';
import chatReducer from '../features/chat-nutricional/model/chatSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 