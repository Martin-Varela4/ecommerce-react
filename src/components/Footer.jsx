import { Box, Container, Typography, Grid, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
   
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.dark', 
        color: 'grey.300', 
        py: 5, 
        mt: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
         
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              TiendaPlatzi Inc.
            </Typography>
            <Typography variant="body2" color="grey.500" sx={{ lineHeight: 1.6 }}>
              © {new Date().getFullYear()} Todos los derechos reservados. 
              Desarrollado para la entrega final de la facultad.
            </Typography>
          </Grid>

        
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="white" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Contacto Corporativo
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Email: soporte@tiendaplatzi.com</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Teléfono: +54 11 4444-5555</Typography>
            <Typography variant="body2">Dirección: Av. Siempreviva 742, CABA</Typography>
          </Grid>

          {/* 3. COLUMNA: REDES SOCIALES FICTICIAS EXIGIDAS */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="white" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Nuestras Redes
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
             
              <Link href="https://facebook.com" target="_blank" color="inherit" sx={{ '&:hover': { color: 'secondary.main' } }}>
                <FacebookIcon sx={{ fontSize: 28 }} />
              </Link>
              <Link href="https://instagram.com" target="_blank" color="inherit" sx={{ '&:hover': { color: 'secondary.main' } }}>
                <InstagramIcon sx={{ fontSize: 28 }} />
              </Link>
              <Link href="https://twitter.com" target="_blank" color="inherit" sx={{ '&:hover': { color: 'secondary.main' } }}>
                <TwitterIcon sx={{ fontSize: 28 }} />
              </Link>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
