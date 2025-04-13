import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  nombre: string | null;
  apellido: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Cargar el estado inicial desde localStorage
const loadInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (token && userStr) {
    try {
      const parsedUser = JSON.parse(userStr);
      if (parsedUser && typeof parsedUser === 'object') {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return {
          isAuthenticated: true,
          user: {
            id: parsedUser.id,
            email: parsedUser.email,
            nombre: parsedUser.nombre || null,
            apellido: parsedUser.apellido || null
          },
          token
        };
      }
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
    }
  }

  return {
    isAuthenticated: false,
    user: null,
    token: null
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      // Guardar en localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      
      // Configurar el token en axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Eliminar el token de axios
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; 