import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, TextField, MenuItem, CircularProgress, Alert } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

export default function Productos() {
  const { products, loading: loadingProd, error: errorProd } = useProducts();
  const { categories, loading: loadingCat } = useCategories();
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaQuery = searchParams.get('categoria') || 'todas';

  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaQuery);

  useEffect(() => {
    setCategoriaSeleccionada(categoriaQuery);
  }, [categoriaQuery]);

  const productosFiltrados = products.filter((product) => {
    const coincideNombre = product.title.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === 'todas' || product.category?.id === Number(categoriaSeleccionada);
    return coincideNombre && coincideCategoria;
  });

  const handleCategoriaChange = (e) => {
    const valor = e.target.value;
    setCategoriaSeleccionada(valor);
    if (valor === 'todas') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', valor);
    }
    setSearchParams(searchParams);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Catálogo de Productos
      </Typography>

      {/* CONTROLES: BUSCADOR Y FILTRO (Material UI TextField) */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Buscar producto por nombre..."
            variant="outlined"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            label="Categoría"
            value={categoriaSeleccionada}
            onChange={handleCategoriaChange}
            disabled={loadingCat}
          >
            <MenuItem value="todas">Todas las categorías</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* ESTADOS DE CARGA Y ERROR */}
      {loadingProd && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      )}
      {errorProd && <Alert severity="error">{errorProd}</Alert>}

      {/* PRODUCTOS */}
      {!loadingProd && !errorProd && (
        <>
          {productosFiltrados.length === 0 ? (
            <Alert severity="info">No se encontraron productos que coincidan con tu búsqueda.</Alert>
          ) : (
            <Grid container spacing={3}>
              {productosFiltrados.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.images && product.images[0] ? product.images[0] : 'https://placeholder.com'}
                      alt={product.title}
                      onError={(e) => { e.target.src = 'https://placeholder.com'; }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', height: '2.5rem', overflow: 'hidden', mb: 1 }}>
                          {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {product.category?.name}
                        </Typography>
                        <Typography variant="h6" color="primary">
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
          )}
        </>
      )}
    </Box>
  );
}
