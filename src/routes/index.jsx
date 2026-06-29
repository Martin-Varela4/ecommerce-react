import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Perfil from '../pages/Perfil';
import Contacto from '../pages/Contacto';
import NotFound from '../pages/NotFound'; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'productos', element: <Productos /> },
      { path: 'producto/:id', element: <ProductDetail /> },
      { path: 'carrito', element: <CartPage /> },
      { path: 'perfil', element: <Perfil /> }, 
      { path: 'contacto', element: <Contacto /> },
    ],
  },
  {
    path: '/login',
    element: <Login />, // Sin Navbar ni Footer
  },
  {
    path: '/registro',
    element: <Registro />, // Sin Navbar ni Footer
  },
  {
    path: '*',
    element: <NotFound />, // Sin Navbar ni Footer
  },
]);
