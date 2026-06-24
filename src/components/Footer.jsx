import { Box, Container, Typography, Grid, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.300', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', mb: 1 }}>
              TiendaPlatzi Inc.
            </Typography>
            <Typography variant="body2" color="grey.500">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </Typography>
          </Grid>

          
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="white" sx={{ fontWeight: 'bold', mb: 1 }}>
              Contacto Informativo
            </Typography>
            <Typography variant="body2">Email: soporte@tiendaplatzi.com</Typography>
            <Typography variant="body2">Teléfono: +54 11 4444-5555</Typography>
            <Typography variant="body2">Dirección: Av. Siempreviva 742, CABA</Typography>
          </Grid>

 
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="white" sx={{ fontWeight: 'bold', mb: 1 }}>
              Redes Sociales
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
              <Link href="https://facebook.com" target="_blank" color="inherit"><FacebookIcon /></Link>
              <Link href="https://instagram.com" target="_blank" color="inherit"><InstagramIcon /></Link>
              <Link href="https://twitter.com" target="_blank" color="inherit"><TwitterIcon /></Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
