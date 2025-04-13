import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '../app/store.ts';
import { addMessage, setLoading } from '../features/chat-nutricional/model/chatSlice.ts';
import { chatApi } from '../features/chat-nutricional/api/chatApi.ts';

export default function ChatNutricional() {
  const [inputValue, setInputValue] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector((state: RootState) => state.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true,
        timestamp: new Date(),
      };

      dispatch(addMessage(userMessage));
      setInputValue('');
      dispatch(setLoading(true));

      try {
        const response = await chatApi.sendMessage(inputValue);
        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: response.message,
          isUser: false,
          timestamp: new Date(),
        };
        dispatch(addMessage(botMessage));
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
            }}
          >
            {message.isUser ? (
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  color: 'grey',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <Typography color="grey">{message.text}</Typography>
              </Box>
            ) : (
              <Typography sx={{ color: 'black', whiteSpace: 'pre-line' }}>{message.text}</Typography>
            )}
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ alignSelf: 'flex-start' }}>
            <Typography>...</Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 2,
        }}
      >
        {isInputVisible && (
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleSendMessage}
            placeholder="Escribe tu mensaje..."
            sx={{
              width: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                borderColor: 'grey.300',
              },
            }}
          />
        )}
        <IconButton
          onClick={() => setIsInputVisible(!isInputVisible)}
          sx={{
            border: '1px solid grey',
            borderRadius: '50%',
            width: 40,
            height: 40,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
} 