import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addMessage, setLoading } = chatSlice.actions;
export default chatSlice.reducer; 