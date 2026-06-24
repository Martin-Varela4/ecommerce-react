import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import ProductDetail from '../pages/ProductDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'productos', element: <Productos /> },
      { path: 'producto/:id', element: <ProductDetail /> },
      { path: 'login', element: <div style={{ padding: '2rem' }}>Página de Login Temporal</div> },
      { path: 'registro', element: <div style={{ padding: '2rem' }}>Página de Registro Temporal</div> },
      { path: 'carrito', element: <div style={{ padding: '2rem' }}>Página de Carrito Temporal</div> },
      { path: 'perfil', element: <div style={{ padding: '2rem' }}>Página de Perfil Temporal</div> },
      { path: 'contacto', element: <div style={{ padding: '2rem' }}>Página de Contacto Temporal</div> },
      { path: '*', element: <div style={{ padding: '2rem', textAlign: 'center' }}>404 - Página no encontrada</div> },
    ],
  },
]);
