import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CircularProgress, Alert } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { products, loading: loadingProd, error: errorProd } = useProducts();
  const { categories, loading: loadingCat } = useCategories();
  const navigate = useNavigate();

  // Seleccionamos exactamente 8 productos de forma aleatoria
  const productosAleatorios = products && products.length > 0
    ? [...products].sort(() => 0.5 - Math.random()).slice(0, 8)
    : [];

  return (
    <Box>
      {/* 1. SECCIÓN DESTACADA (BANNER) */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 5, borderRadius: 2, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          ¡Bienvenidos a Nuestra Tienda!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Descubre los mejores productos con la tecnología más avanzada del mercado.
        </Typography>
        <Button variant="contained" color="secondary" size="large" onClick={() => navigate('/productos')}>
          Ver Catálogo Completo
        </Button>
      </Box>

      {/* 2. NAVBAR DE CATEGORÍAS */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Categorías Destacadas</Typography>
      {loadingCat ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, mb: 5, flexWrap: 'wrap' }}>
          {categories.slice(0, 5).map((category) => (
            <Button 
              key={category.id} 
              variant="outlined" 
              onClick={() => navigate(`/productos?categoria=${category.id}`)}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      )}

      {/* 3. SECCIÓN DE 8 PRODUCTOS ALEATORIOS */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Productos Recomendados</Typography>
      
      {loadingProd && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
      {errorProd && <Alert severity="error">{errorProd}</Alert>}
      
      <Grid container spacing={3}>
        {productosAleatorios.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                height="180"
                // CORRECCIÓN: Accedemos al primer elemento del array de imágenes de Platzi
                image={product.images && product.images[0] ? product.images[0] : 'https://placeholder.com'}
                alt={product.title}
                onError={(e) => { e.target.src = 'https://placeholder.com'; }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography gutterBottom variant="body1" sx={{ fontWeight: 'bold', height: '2.5rem', overflow: 'hidden' }}>
                    {product.title}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ my: 1 }}>
                    ${product.price}
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/producto/${product.id}`)}
                >
                  Ver Detalle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
