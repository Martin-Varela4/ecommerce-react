import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Contacto() {

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  

  const [error, setError] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setEnviado(false);

   
    if (formData.nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresá un formato de correo electrónico válido.');
      return;
    }

    
    if (formData.asunto.trim().length < 4) {
      setError('El asunto de la consulta es muy corto.');
      return;
    }

    
    if (formData.mensaje.trim().length < 10) {
      setError('El mensaje debe tener al menos 10 caracteres para poder procesar tu consulta.');
      return;
    }

   
    setEnviado(true);
    
  
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    
    
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Contacto
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dejanos tu consulta y te responderemos a la brevedad
          </Typography>
        </Box>

        {/* ALERTAS DE ESTADO CONTROLADAS POR NUESTROS USESTATE */}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {enviado && (
          <Alert severity="success" sx={{ mb: 3, fontWeight: 'bold' }}>
            ¡Mensaje enviado con éxito! Gracias por contactarnos.
          </Alert>
        )}

        {/* FORMULARIO CONTROLADO DE MATERIAL UI */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Nombre completo"
            name="nombre"
            fullWidth
            required
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Juan Pérez"
          />
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
            label="Asunto"
            name="asunto"
            fullWidth
            required
            value={formData.asunto}
            onChange={handleChange}
            placeholder="Consulta de stock / Envío"
          />
          <TextField
            label="Mensaje"
            name="mensaje"
            multiline
            rows={4}
            fullWidth
            required
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribí detalladamente tu consulta aquí..."
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon />}
            sx={{ fontWeight: 'bold', mt: 1 }}
          >
            Enviar Mensaje
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
