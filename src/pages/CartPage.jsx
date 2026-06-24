import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, IconButton, Paper, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { carrito, agregarProducto, eliminarProducto, vaciarCarrito, total } = useCart();
  const navigate = useNavigate();

  // Si el carrito está vacío, muestra un lindo estado informativo
  if (carrito.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <ShoppingBagIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Explora nuestra tienda y descubre productos increíbles.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/productos')}>
          Ir al catálogo
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Tu Carrito de Compras
      </Typography>

      <Grid container spacing={4}>
        {/* LISTADO DE PRODUCTOS EN EL CARRITO */}
        <Grid item xs={12} md={8}>
          {carrito.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 2, p: 1, alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover', mr: 2 }}
                  image={item.images && item.images[0] ? item.images[0] : 'https://placeholder.com'}
                  alt={item.title}
                  onError={(e) => { e.target.src = 'https://placeholder.com'; }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio unitario: ${item.price}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                    Subtotal: ${item.price * item.cantidad}
                  </Typography>
                </Box>
              </Box>

              {/* CONTROLES DE CANTIDAD (Agregar/Eliminar) */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton 
                  size="small" 
                  color="primary" 
                  onClick={() => eliminarProducto(item.id)}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ fontWeight: 'bold', minWidth: 20, textAlign: 'center' }}>
                  {item.cantidad}
                </Typography>
                <IconButton 
                  size="small" 
                  color="primary" 
                  onClick={() => agregarProducto(item)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Card>
          ))}

          {/* BOTÓN OBLIGATORIO PARA VACIAR EL CARRITO */}
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<DeleteIcon />} 
            onClick={vaciarCarrito}
            sx={{ mt: 2 }}
          >
            Vaciar Carrito
          </Button>
        </Grid>

        {/* RESUMEN DE LA COMPRA (TOTAL) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Resumen del Pedido
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" color="text.secondary">Productos:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {carrito.reduce((acc, curr) => acc + curr.cantidad, 0)} uds.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total:</Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                ${total}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              size="large"
              onClick={() => alert('¡Compra exitosa!')}
              sx={{ fontWeight: 'bold' }}
            >
              Finalizar Compra
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
