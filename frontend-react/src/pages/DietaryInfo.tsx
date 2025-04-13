import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { RootState } from '../app/store';
import { 
  addMealTime, 
  removeMealTime, 
  setShoppingFrequency, 
  setCookingFrequency,
  setExerciseDuration,
  setExerciseFrequency
} from '../features/dietary/model/dietarySlice.ts';
import axios from 'axios';

interface UserData {
  nombre: string;
  apellido: string;
  actividad_fisica: string;
  peso: number;
}

export default function DietaryInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [showWorkingMessage, setShowWorkingMessage] = useState(false);

  const { 
    mealTimes, 
    shoppingFrequency, 
    cookingFrequency,
    exerciseDuration,
    exerciseFrequency
  } = useSelector((state: RootState) => state.dietary);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/profile');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleAddTime = () => {
    if (selectedTime) {
      dispatch(addMealTime(selectedTime));
      setSelectedTime('');
      setTimeDialogOpen(false);
    }
  };

  const handleRemoveTime = (time: string) => {
    dispatch(removeMealTime(time));
  };

  const handleConfirm = () => {
    const dietaryInfo = {
      mealTimes,
      shoppingFrequency,
      cookingFrequency,
      exerciseDuration,
      exerciseFrequency
    };
    console.log('Dietary Information:', JSON.stringify(dietaryInfo, null, 2));
    setConfirmationDialogOpen(false);
    navigate('/');
  };

  const handleReject = () => {
    setConfirmationDialogOpen(false);
    setShowWorkingMessage(true);
    setTimeout(() => {
      setShowWorkingMessage(false);
      navigate('/');
    }, 3000);
  };

  return (
    <Container 
      component="main" 
      maxWidth="md" 
      sx={{ 
        backgroundColor: 'white', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}
    >
      <Box sx={{ 
        width: '25%',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
      }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            color: 'black',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Declaración
        </Typography>

        {userData && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1">
              Nombre: {userData.nombre} {userData.apellido}
            </Typography>
            <Typography variant="subtitle1">
              Actividad Física: {userData.actividad_fisica}
            </Typography>
            <Typography variant="subtitle1">
              Peso: {userData.peso} kg
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <Typography variant="subtitle1" sx={{ minWidth: '100px' }}>
              Como a las
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {mealTimes.map((time) => (
                <Button
                  key={time}
                  variant="outlined"
                  onClick={() => handleRemoveTime(time)}
                  sx={{
                    borderColor: 'grey',
                    color: 'grey',
                    '&:hover': {
                      borderColor: 'black',
                      color: 'black'
                    }
                  }}
                >
                  {time} hrs
                </Button>
              ))}
              <IconButton 
                onClick={() => setTimeDialogOpen(true)}
                sx={{ 
                  color: 'grey',
                  '&:hover': {
                    color: 'black'
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <Typography variant="subtitle1" sx={{ minWidth: '100px' }}>
              Compro
            </Typography>
            <select
              value={shoppingFrequency}
              onChange={(e) => dispatch(setShoppingFrequency(e.target.value))}
              style={{
                width: 'fit-content',
                padding: '8px',
                border: 'none',
                outline: 'none',
                backgroundColor: 'white',
                color: 'grey',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: 'none'
              }}
            >
              <option value="">Seleccione</option>
              <option value="2_veces_semana">2 veces a la semana</option>
              <option value="semanal">Cada una semana</option>
              <option value="quincenal">Cada dos semanas</option>
            </select>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <Typography variant="subtitle1" sx={{ minWidth: '100px' }}>
              Cocino
            </Typography>
            <select
              value={cookingFrequency}
              onChange={(e) => dispatch(setCookingFrequency(e.target.value))}
              style={{
                width: 'fit-content',
                padding: '8px',
                border: 'none',
                outline: 'none',
                backgroundColor: 'white',
                color: 'grey',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: 'none'
              }}
            >
              <option value="">Seleccione</option>
              <option value="todos_dias">Todos los días</option>
              <option value="2_veces_semana">2 veces a la semana</option>
              <option value="semanal">Cada una semana</option>
            </select>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <Typography variant="subtitle1" sx={{ minWidth: '100px' }}>
              Me ejercito
            </Typography>
            <Box sx={{ display: 'flex', gap: 0 }}>
              <select
                value={exerciseDuration}
                onChange={(e) => dispatch(setExerciseDuration(e.target.value))}
                style={{
                  width: 'fit-content',
                  padding: '8px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'white',
                  color: 'grey',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  backgroundImage: 'none'
                }}
              >
                <option value="">Duración</option>
                <option value="30min">30 min</option>
                <option value="40min">40 min</option>
                <option value="1hr">1 hora</option>
                <option value="1hr40min">1 hora 40 min</option>
              </select>
              <select
                value={exerciseFrequency}
                onChange={(e) => dispatch(setExerciseFrequency(e.target.value))}
                style={{
                  width: 'fit-content',
                  padding: '8px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'white',
                  color: 'grey',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  backgroundImage: 'none'
                }}
              >
                <option value="">Frecuencia</option>
                <option value="2_veces_semana">2 veces a la semana</option>
                <option value="3_veces_semana">3 veces a la semana</option>
                <option value="4_veces_semana">4 veces a la semana</option>
                <option value="todos_dias">Todos los días</option>
              </select>
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 4,
          width: '100%'
        }}>
          <Button
            onClick={() => setConfirmationDialogOpen(true)}
            sx={{ 
              color: 'grey',
              fontWeight: 'bold',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          >
            SI
          </Button>
          <Button
            onClick={() => setConfirmationDialogOpen(true)}
            sx={{ 
              color: 'grey',
              fontWeight: 'bold',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          >
            NO
          </Button>
        </Box>
      </Box>

      <Dialog open={timeDialogOpen} onClose={() => setTimeDialogOpen(false)}>
        <DialogTitle>Seleccionar hora</DialogTitle>
        <DialogContent>
          <TextField
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTimeDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddTime}>Agregar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showWorkingMessage} onClose={() => setShowWorkingMessage(false)}>
        <DialogContent>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Se está trabajando en eso, paciencia
            </Typography>
            <AccessTimeIcon sx={{ fontSize: 40, color: 'grey' }} />
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
} 