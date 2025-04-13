import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from './app/store.ts';
import { RootState } from './app/store.ts';
import LoginForm from './features/auth/components/LoginForm.tsx';
import RegisterForm from './features/auth/components/RegisterForm.tsx';
import Home from './pages/Home.tsx';
import ChatNutricional from './pages/ChatNutricional.tsx';
import DietaryInfo from './pages/DietaryInfo.tsx';
import { setUser } from './features/auth/model/authSlice.ts';

function AppRoutes() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Verificar si hay un token guardado
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" />} />
      <Route path="/chat-nutricional" element={isAuthenticated ? <ChatNutricional /> : <Navigate to="/login" />} />
      <Route path="/dietary-info" element={isAuthenticated ? <DietaryInfo /> : <Navigate to="/login" />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;


