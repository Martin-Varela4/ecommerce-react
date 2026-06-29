import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Alert, Container } from '@mui/material';
import { useUser } from '../contexts/UserContext'; 

export default function Registro() {
  const { registro } = useUser(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

   
    if (formData.nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    // formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresá un correo electrónico válido.');
      return;
    }

    // contraseña
    if (formData.password.length < 6) {
      setError('La contraseña es muy corta. Debe tener un mínimo de 6 caracteres.');
      return;
    }

    // comparacinn
    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden. Verificalas.');
      return;
    }

    setLoading(true);
    try {
      const nuevoUsuario = {
        nombre: formData.nombre,
        name: formData.nombre, 
        email: formData.email,
        password: formData.password
      };

      const esExitoso = registro(nuevoUsuario);
      if (esExitoso) {
        alert('¡Usuario registrado con éxito! Ya podés iniciar sesión.');
        navigate('/login'); 
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error durante el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Crear Cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Registrate para gestionar tus compras y perfil
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre Completo"
            name="nombre"
            fullWidth
            required
            value={formData.nombre}
            onChange={handleChange}
          />
          <TextField
            label="Correo Electrónico"
            type="email"
            name="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            name="confirmarPassword"
            fullWidth
            required
            value={formData.confirmarPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ fontWeight: 'bold', textTransform: 'none', mt: 1 }}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 1, fontSize: '0.9rem' }}>
          ¿Ya tenés una cuenta?{' '}
          <Link to="/login" style={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>
            Iniciá sesión acá
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}
