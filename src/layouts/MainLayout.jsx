import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
import { Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import Footer from '../components/Footer.jsx'; 

export default function MainLayout() {
  const { carrito } = useCart();
  const { usuario, logout } = useUser();
  const navigate = useNavigate();

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: 0, gap: 1 }}>
            
            
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 'bold' }}
              onClick={() => navigate('/')}
            >
              <HomeIcon />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                TiendaPlatzi
              </Box>
            </Typography>

            {/* SECCIÓN DE ENLACES DE NAVEGACIÓN ADAPTABLES */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
              
              
              <Button 
                color="inherit" 
                onClick={() => navigate('/productos')}
                startIcon={<StorefrontIcon />}
                sx={{ minWidth: { xs: 'auto', sm: '64px' }, '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } } }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Productos</Box>
              </Button>

              <Button 
                color="inherit" 
                onClick={() => navigate('/contacto')}
                startIcon={<ContactMailIcon />}
                sx={{ minWidth: { xs: 'auto', sm: '64px' }, '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } } }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Contacto</Box>
              </Button>

              {/* Icono del Carrito: Se reduce el padding en móviles */}
              <IconButton color="inherit" onClick={() => navigate('/carrito')} sx={{ p: { xs: 0.5, sm: 1 } }}>
                <Badge badgeContent={cantidadTotal} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* FLUJO CONDICIONAL AUTENTICACIÓN RESPONSIVO */}
              {usuario ? (
                <>
              
                  <Button 
                    color="inherit" 
                    onClick={() => navigate('/perfil')}
                    startIcon={<PersonIcon />}
                    sx={{ minWidth: { xs: 'auto', sm: '64px' }, '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } } }}
                  >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Perfil</Box>
                  </Button>
                  <IconButton 
                    color="inherit" 
                    onClick={() => { logout(); navigate('/login'); }}
                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                  >
                    <LogoutIcon />
                  </IconButton>
                  <Button 
                    color="inherit" 
                    startIcon={<LogoutIcon />} 
                    onClick={() => { logout(); navigate('/login'); }}
                    sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontWeight: 'bold' }}
                  >
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  
                  <Button 
                    color="inherit" 
                    onClick={() => navigate('/registro')}
                    sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                  >
                    Registrarse
                  </Button>
                  
            
                  <IconButton 
                    color="inherit" 
                    onClick={() => navigate('/login')}
                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                  >
                    <LoginIcon />
                  </IconButton>
                  <Button 
                    color="inherit" 
                    variant="outlined"
                    startIcon={<LoginIcon />} 
                    onClick={() => navigate('/login')}
                    sx={{ 
                      display: { xs: 'none', sm: 'inline-flex' },
                      borderColor: 'white', 
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } 
                    }}
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
      <Container component="main" maxWidth="lg" sx={{ mt: 3, mb: 3, flexGrow: 1, px: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}
