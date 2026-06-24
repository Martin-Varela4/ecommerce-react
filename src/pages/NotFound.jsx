import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh', 
          textAlign: 'center',
          gap: 2,
        }}
      >
        
        <WarningIcon sx={{ fontSize: 100, color: 'warning.main' }} />
        
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          404
        </Typography>
        
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Ups, la página que estás buscando no existe.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={() => navigate('/')}
          sx={{ fontWeight: 'bold', textTransform: 'none', px: 4 }}
        >
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
}
