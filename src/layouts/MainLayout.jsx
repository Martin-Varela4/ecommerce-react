import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext'; 

export default function MainLayout() {
  const { carrito } = useCart(); 
  const { usuario, logout } = useUser(); 
  const navigate = useNavigate();

  
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => navigate('/')}
            >
              <HomeIcon /> Mi E-Commerce
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button color="inherit" onClick={() => navigate('/productos')}>
                Productos
              </Button>

              
              <IconButton color="inherit" onClick={() => navigate('/carrito')}>
                <Badge badgeContent={cantidadTotal} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              
              {usuario ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/perfil')}
                  >
                    Hola, {usuario.nombre || usuario.name || 'Usuario'}
                  </Typography>
                  <Button 
                    color="inherit" 
                    startIcon={<LogoutIcon />} 
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                  >
                    Salir
                  </Button>
                </Box>
              ) : (
                <Button 
                  color="inherit" 
                  startIcon={<LoginIcon />} 
                  onClick={() => navigate('/login')}
                >
                  Ingresar
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
