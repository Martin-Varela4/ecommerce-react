import { Box, Typography, Paper, Container, Alert, Button, Divider, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';

export default function Perfil() {
  const { usuario, logout } = useUser();
  const { carrito } = useCart();
  const navigate = useNavigate();

  const cantidadEnCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  if (!usuario) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert 
          severity="warning" 
          variant="filled"
          action={
            <Button color="inherit" size="small" startIcon={<LockOpenIcon />} onClick={() => navigate('/login')}>
              Iniciar Sesión
            </Button>
          }
        >
          Debes iniciar sesión para poder ver los datos de tu perfil.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: 4 }}>
        {/* encabezado */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, borderRadius: '50%', mb: 1 }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Mi Perfil de Usuario
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Datos correspondientes a la sesión activa
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />


        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {/* Nombre */}
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PersonIcon color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Nombre del usuario</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {usuario.nombre || usuario.name}
              </Typography>
            </Box>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <EmailIcon color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Email</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {usuario.email}
              </Typography>
            </Box>
          </Grid>

          {/* Cantidad de productos en carrito */}
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ShoppingCartIcon color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Cantidad de productos en carrito</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {cantidadEnCarrito} {cantidadEnCarrito === 1 ? 'producto' : 'productos'}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Button 
          variant="outlined" 
          color="error" 
          fullWidth 
          onClick={() => {
            logout();
            navigate('/login');
          }}
          sx={{ fontWeight: 'bold' }}
        >
          Cerrar Sesión
        </Button>
      </Paper>
    </Container>
  );
}
