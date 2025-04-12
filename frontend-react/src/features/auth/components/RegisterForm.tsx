import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Paper, 
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { setCredentials } from '../authSlice';
import axios from 'axios';

interface FamilyMemberForm {
  nombre: string;
  apellido: string;
  sexo: string;
  edad: string;
  peso: string;
  altura: string;
  actividad_fisica: string;
  horario_laboral: {
    inicio: string;
    fin: string;
  };
  comidas_dia: string;
}

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    sexo: '',
    edad: '',
    peso: '',
    altura: '',
    actividad_fisica: '',
    horario_laboral: {
      inicio: '',
      fin: ''
    },
    comidas_dia: '',
    frecuencia_compras: '',
    vive_solo: false
  });

  const [familyMember, setFamilyMember] = useState<FamilyMemberForm>({
    nombre: '',
    apellido: '',
    sexo: '',
    edad: '',
    peso: '',
    altura: '',
    actividad_fisica: '',
    horario_laboral: {
      inicio: '',
      fin: ''
    },
    comidas_dia: ''
  });

  const [showFamilyMemberForm, setShowFamilyMemberForm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users', {
        ...formData,
        familiares: !formData.vive_solo ? [familyMember] : []
      });
      
      // Iniciar sesión automáticamente después del registro
      const loginResponse = await axios.post('http://localhost:3000/auth/login', {
        email: formData.email,
        password: formData.password
      });

      dispatch(setCredentials({
        user: {
          id: response.data.id,
          email: response.data.email,
        },
        token: loginResponse.data.access_token,
      }));
      
      navigate('/');
    } catch (err) {
      setError('Error al registrar el usuario');
      console.error('Error al registrar:', err);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Registro de Usuario
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Sexo</InputLabel>
                  <Select
                    value={formData.sexo}
                    label="Sexo"
                    onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                    required
                  >
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="femenino">Femenino</MenuItem>
                    <MenuItem value="otro">Otro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Edad"
                  type="number"
                  value={formData.edad}
                  onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Peso (kg)"
                  type="number"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Altura (cm)"
                  type="number"
                  value={formData.altura}
                  onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Actividad Física</InputLabel>
                  <Select
                    value={formData.actividad_fisica}
                    label="Actividad Física"
                    onChange={(e) => setFormData({ ...formData, actividad_fisica: e.target.value })}
                    required
                  >
                    <MenuItem value="muy_activo">Muy Activo</MenuItem>
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="poco_activo">Poco Activo</MenuItem>
                    <MenuItem value="sedentario">Sedentario</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Comidas por día"
                  type="number"
                  value={formData.comidas_dia}
                  onChange={(e) => setFormData({ ...formData, comidas_dia: e.target.value })}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Frecuencia de Compras</InputLabel>
                  <Select
                    value={formData.frecuencia_compras}
                    label="Frecuencia de Compras"
                    onChange={(e) => setFormData({ ...formData, frecuencia_compras: e.target.value })}
                    required
                  >
                    <MenuItem value="diario">Todos los días</MenuItem>
                    <MenuItem value="semanal">Una vez por semana</MenuItem>
                    <MenuItem value="quincenal">Una vez cada dos semanas</MenuItem>
                    <MenuItem value="esporadico">Esporádico</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.vive_solo}
                      onChange={(e) => setFormData({ ...formData, vive_solo: e.target.checked })}
                    />
                  }
                  label="Vivo solo/a"
                />
              </Grid>
            </Grid>

            {!formData.vive_solo && (
              <>
                <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                  Por favor, completa la información de la persona con la que compartes la vivienda.
                  Esto nos ayudará a generar listas de compras y dietas más precisas.
                </Alert>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Información del Familiar
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nombre"
                      value={familyMember.nombre}
                      onChange={(e) => setFamilyMember({ ...familyMember, nombre: e.target.value })}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Apellido"
                      value={familyMember.apellido}
                      onChange={(e) => setFamilyMember({ ...familyMember, apellido: e.target.value })}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Sexo</InputLabel>
                      <Select
                        value={familyMember.sexo}
                        label="Sexo"
                        onChange={(e) => setFamilyMember({ ...familyMember, sexo: e.target.value })}
                        required
                      >
                        <MenuItem value="masculino">Masculino</MenuItem>
                        <MenuItem value="femenino">Femenino</MenuItem>
                        <MenuItem value="otro">Otro</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Edad"
                      type="number"
                      value={familyMember.edad}
                      onChange={(e) => setFamilyMember({ ...familyMember, edad: e.target.value })}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Peso (kg)"
                      type="number"
                      value={familyMember.peso}
                      onChange={(e) => setFamilyMember({ ...familyMember, peso: e.target.value })}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Altura (cm)"
                      type="number"
                      value={familyMember.altura}
                      onChange={(e) => setFamilyMember({ ...familyMember, altura: e.target.value })}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Actividad Física</InputLabel>
                      <Select
                        value={familyMember.actividad_fisica}
                        label="Actividad Física"
                        onChange={(e) => setFamilyMember({ ...familyMember, actividad_fisica: e.target.value })}
                        required
                      >
                        <MenuItem value="muy_activo">Muy Activo</MenuItem>
                        <MenuItem value="activo">Activo</MenuItem>
                        <MenuItem value="poco_activo">Poco Activo</MenuItem>
                        <MenuItem value="sedentario">Sedentario</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Comidas por día"
                      type="number"
                      value={familyMember.comidas_dia}
                      onChange={(e) => setFamilyMember({ ...familyMember, comidas_dia: e.target.value })}
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Registrarse
            </Button>
          </form>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
} 