import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, CircularProgress, Alert } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { products, loading: loadingProd, error: errorProd } = useProducts();
  const { categories, loading: loadingCat } = useCategories();
  const navigate = useNavigate();

  // Filtramos para mostrar exactamente 8 productos de forma aleatoria si existen
  const productosAleatorios = products && products.length > 0
    ? [...products].sort(() => 0.5 - Math.random()).slice(0, 8)
    : [];

  return (
    <Box>
      {/* 1. SECCIÓN DESTACADA (BANNER) */}
      <Box sx={{ bgcolor: 'primary.light', color: 'white', p: 6, borderRadius: 2, mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          ¡Bienvenidos a Nuestra Tienda!
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Descubre los mejores productos con la tecnología más avanzada del mercado.
        </Typography>
        {/* BOTÓN DE BIENVENIDA */}
        <Button variant="contained" color="secondary" size="large" onClick={() => navigate('/productos')}>
          Ver Catálogo Completo
        </Button>
      </Box>

      
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Categorías Destacadas</Typography>
      {loadingCat ? (
        <CircularProgress sx={{ my: 2 }} />
      ) : (
        <Box sx={{ display: 'flex', gap: 2, mb: 5, flexWrap: 'wrap' }}>
          {categories.slice(0, 5).map((category) => (
            <Button 
              key={category.id} 
              variant="outlined" 
              color="primary"
              onClick={() => navigate(`/productos?categoria=${category.id}`)}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      )}

      
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Productos Recomendados</Typography>
      
      {loadingProd && <CircularProgress />}
      {errorProd && <Alert severity="error">{errorProd}</Alert>}
      
      <Grid container spacing={3}>
        {productosAleatorios.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'between' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.images?.[0] || 'https://placeholder.com'}
                alt={product.title}
                onError={(e) => { e.target.src = 'https://placeholder.com'; }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: 'bold', height: '3rem', overflow: 'hidden' }}>
                  {product.title}
                </Typography>
                <Typography variant="h6" color="secondary" sx={{ my: 1 }}>
                  ${product.price}
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
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
