import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Typography, Container, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

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
        alignItems: 'center'
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          component="h1" 
          align="center" 
          sx={{ 
            color: 'black',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Elija formato
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Button
            variant="text"
            onClick={() => navigate('/dietary-info')}
            sx={{
              width: '200px',
              height: '50px',
              color: 'grey',
              borderRadius: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              outline: 'none',
              '&:hover': {
                color: 'black'
              },
              '&:focus': {
                outline: 'none'
              }
            }}
          >
            Dietario
          </Button>
          
          <Button
            variant="text"
            disabled
            sx={{
              width: '200px',
              height: '50px',
              color: 'grey',
              borderRadius: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex'
            }}
          >
            Meditación
          </Button>
          
          <Button
            variant="text"
            disabled
            sx={{
              width: '200px',
              height: '50px',
              color: 'grey',
              borderRadius: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex'
            }}
          >
            Distinciones
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 