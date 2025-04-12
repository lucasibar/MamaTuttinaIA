import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Paper,
  Typography
} from '@mui/material';
import { RootState } from '../../../app/store';
import { setFormData, setDieta, setLoading, setError } from '../dietSlice.ts';
import axios from 'axios';

export default function DietForm() {
  const dispatch = useDispatch();
  const { formData, dieta, loading, error } = useSelector((state: RootState) => state.diet);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      // Primero generamos la dieta
      const res = await axios.post('http://localhost:3000/dieta', formData);
      
      // Luego actualizamos el usuario con los datos de la dieta
      if (user?.id) {
        await axios.post(`http://localhost:3000/users/${user.id}/dieta`, {
          ...formData,
          dieta: res.data
        });
      }
      
      dispatch(setDieta(res.data));
    } catch (error) {
      dispatch(setError('Error al generar la dieta'));
      console.error('Error al generar la dieta:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Generador de Dieta Personalizada
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Sexo"
              value={formData.sexo}
              onChange={(e) => dispatch(setFormData({ sexo: e.target.value }))}
              required
            />
            <TextField
              label="Edad"
              type="number"
              value={formData.edad}
              onChange={(e) => dispatch(setFormData({ edad: e.target.value }))}
              required
            />
            <TextField
              label="Peso (kg)"
              type="number"
              value={formData.peso}
              onChange={(e) => dispatch(setFormData({ peso: e.target.value }))}
              required
            />
            <TextField
              label="Estatura (cm)"
              type="number"
              value={formData.estatura}
              onChange={(e) => dispatch(setFormData({ estatura: e.target.value }))}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Nivel de Actividad</InputLabel>
              <Select
                value={formData.actividad}
                label="Nivel de Actividad"
                onChange={(e) => dispatch(setFormData({ actividad: e.target.value }))}
                required
              >
                <MenuItem value="sedentario">Sedentario</MenuItem>
                <MenuItem value="poco movimiento">Poco movimiento</MenuItem>
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="super activo">Súper activo</MenuItem>
              </Select>
            </FormControl>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading || !user?.id}
            >
              {loading ? 'Generando...' : 'Generar Dieta'}
            </Button>
          </Box>
        </form>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {dieta.length > 0 && (
        <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Tu Dieta Personalizada
          </Typography>
          {dieta.map((comida: any, index: number) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6">{comida.titulo}</Typography>
              <Typography>Hora: {comida.hora}</Typography>
              <Typography>Ingredientes: {comida.ingredientes}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
} 