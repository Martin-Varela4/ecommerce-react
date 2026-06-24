import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Box, Typography, TextField, Button, Paper, Alert, Container } from '@mui/material';
import { useUser } from '../contexts/UserContext'; // <-- Importamos tu contexto obligatorio

export default function Login() { 
  const { login } = useUser(); // Consumimos la función obligatoria de la consigna
  const navigate = useNavigate();

  // Estados locales requeridos por la consigna (Formulario, Error y Loading)
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejador genérico de inputs que ya conoces
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Enfoque adaptado: Sin servidor, simulado localmente mediante Context API
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null);
    setLoading(true);
    
    try {
      // Intentamos iniciar sesión con los datos locales de UserContext
      const esExitoso = login(formData.email, formData.password);
      
      if (esExitoso) {
        alert('¡Inicio de sesión correcto!');
        navigate('/perfil'); // Redirigimos directo al perfil del usuario
      }
    } catch (err) {
      // Capturamos el error si las credenciales no coinciden
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ingresa tus credenciales para acceder
          </Typography>
        </Box>

        {/* ALERTA DE ERROR EXIGIDA POR LA CONSIGNA */}
        {error && <Alert severity="error">{error}</Alert>}
        
        {/* FORMULARIO CONTROLADO CON MATERIAL UI */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField 
            label="Correo Electrónico" 
            type="email" 
            name="email" 
            fullWidth
            required
            value={formData.email} 
            onChange={handleChange} 
            placeholder="tu@ejemplo.com" 
          />
          <TextField 
            label="Contraseña" 
            type="password" 
            name="password" 
            fullWidth
            required
            value={formData.password} 
            onChange={handleChange} 
            placeholder="••••••••" 
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            disabled={loading}
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>
        </Box>
        
        {/* LINK CORREGIDO SEGÚN TUS RUTAS (cambiado de /register a /registro) */}
        <Box sx={{ textAlign: 'center', mt: 2, fontSize: '0.9rem' }}>
          ¿No tenés cuenta?{' '}
          <Link to="/registro" style={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>
            Registrate acá
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}
