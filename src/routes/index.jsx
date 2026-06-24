import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage'; // <-- ASEGURAMOS LA IMPORTACIÓN REAL
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Perfil from '../pages/Perfil';
import Contacto from '../pages/Contacto';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'productos', element: <Productos /> },
      { path: 'producto/:id', element: <ProductDetail /> },
      { path: 'carrito', element: <CartPage /> }, 
      { path: 'login', element: <Login /> },
      { path: 'registro', element: <Registro /> },
      { path: 'perfil', element: <Perfil /> },
      { path: 'contacto', element: <Contacto /> },
      { path: '*', element: <div style={{ padding: '2rem', textAlign: 'center' }}>404 - Página no encontrada</div> },
    ],
  },
]);

