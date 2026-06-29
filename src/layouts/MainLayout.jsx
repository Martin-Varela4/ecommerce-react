import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar*/}
      <Navbar />

      <Container component="main" maxWidth="lg" sx={{ mt: 3, mb: 3, flexGrow: 1, px: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}
