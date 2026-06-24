import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button, CircularProgress, Alert, Container, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchProductById } from '../services/platziApi';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { agregarProducto } = useCart(); 

  const { usuario } = useUser();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        setProducto(data);
      } catch (err) {
        setError(err.message || 'No se pudo cargar el detalle del producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) getProductDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={() => navigate('/productos')}>Volver al catálogo</Button>
        }>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} 
        sx={{ mb: 3 }}
      >
        Volver atrás
      </Button>

      {producto && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  objectFit: 'contain',
                  borderRadius: 1,
                  bgcolor: '#f5f5f5'
                }}
                src={producto.images && producto.images[0] ? producto.images[0] : 'https://placeholder.com'}
                alt={producto.title}
                onError={(e) => { e.target.src = 'https://placeholder.com'; }}
              />
            </Grid>

            {/* INFORMACIÓN DEL PRODUCTO */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                {/* CATEGORÍA */}
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                  Categoría: {producto.category?.name || 'Varios'}
                </Typography>

                {/* TÍTULO */}
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {producto.title}
                </Typography>

                {/* PRECIO */}
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
                  ${producto.price}
                </Typography>

                {/* DESCRIPCIÓN */}
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {producto.description}
                </Typography>
              </Box>

              <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                  onClick={() => {
                    // 1. IMPORTANTE: Necesitas importar const { usuario } = useUser(); arriba en el componente
                    if (!usuario) {
                      alert('Debes iniciar sesión para agregar productos al carrito.');
                      navigate('/login');
                    } else {
                      agregarProducto(producto);
                    }
                  }}
                  sx={{ py: 1.5, fontWeight: 'bold' }}
                >
                  Agregar al Carrito
                </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
