import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import Footer from '../components/Footer';

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
            {/* LOGO E-COMMERCE */}
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}
              onClick={() => navigate('/')}
            >
              <HomeIcon /> TiendaPlatzi
            </Typography>

            {/* SECCIÓN DE ENLACES DE NAVEGACIÓN */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
              
              {/* Enlace obligatorio a Catálogo General */}
              <Button color="inherit" onClick={() => navigate('/productos')}>
                Productos
              </Button>

              {/* Enlace obligatorio a Contacto */}
              <Button color="inherit" startIcon={<ContactMailIcon />} onClick={() => navigate('/contacto')}>
                Contacto
              </Button>

              {/* Icono del Carrito */}
              <IconButton color="inherit" onClick={() => navigate('/carrito')}>
                <Badge badgeContent={cantidadTotal} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Enlace condicional a Perfil / Login / Registro */}
              {usuario ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button color="inherit" startIcon={<PersonIcon />} onClick={() => navigate('/perfil')}>
                    Mi Perfil
                  </Button>
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
                <>
                  <Button color="inherit" onClick={() => navigate('/registro')}>
                    Registrarse
                  </Button>
                  <Button 
                    color="inherit" 
                    variant="outlined"
                    startIcon={<LoginIcon />} 
                    onClick={() => navigate('/login')}
                    sx={{ borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                  >
                    Ingresar
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* CONTENIDO DE LAS PÁGINAS */}
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>

      <Footer />
      
    </Box>
  );
}
