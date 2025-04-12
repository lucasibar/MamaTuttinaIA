import React, { useState } from 'react';
import axios from 'axios';
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

interface FormData {
  sexo: string;
  edad: string;
  peso: string;
  estatura: string;
  actividad: string;
}

export default function Formulario() {
  const [formData, setFormData] = useState<FormData>({
    sexo: '',
    edad: '',
    peso: '',
    estatura: '',
    actividad: '',
  });

  const [dieta, setDieta] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/dieta', formData);
      setDieta(res.data);
    } catch (error) {
      console.error('Error al generar la dieta:', error);
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
              onChange={(e) => setFormData({...formData, sexo: e.target.value})}
              required
            />
            <TextField
              label="Edad"
              type="number"
              value={formData.edad}
              onChange={(e) => setFormData({...formData, edad: e.target.value})}
              required
            />
            <TextField
              label="Peso (kg)"
              type="number"
              value={formData.peso}
              onChange={(e) => setFormData({...formData, peso: e.target.value})}
              required
            />
            <TextField
              label="Estatura (cm)"
              type="number"
              value={formData.estatura}
              onChange={(e) => setFormData({...formData, estatura: e.target.value})}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Nivel de Actividad</InputLabel>
              <Select
                value={formData.actividad}
                label="Nivel de Actividad"
                onChange={(e) => setFormData({...formData, actividad: e.target.value})}
                required
              >
                <MenuItem value="sedentario">Sedentario</MenuItem>
                <MenuItem value="poco movimiento">Poco movimiento</MenuItem>
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="super activo">Súper activo</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Generar Dieta
            </Button>
          </Box>
        </form>
      </Paper>

      {dieta && (
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