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
  

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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

      
        {enviado && (
          <Alert severity="success" sx={{ mb: 3, fontWeight: 'bold' }}>
            ¡Mensaje enviado con éxito! Gracias por contactarnos.
          </Alert>
        )}

        {/* FORMULARIO CONTROLADO */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Nombre completo"
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
            label="Asunto"
            name="asunto"
            fullWidth
            required
            value={formData.asunto}
            onChange={handleChange}
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
