import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function MainLayout() {
  const { getCartCount } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

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
              <IconButton color="inherit" onClick={() => navigate('/cart')}>
                <Badge badgeContent={getCartCount()} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isAuthenticated ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Hola, {user?.name || 'Usuario'}
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
