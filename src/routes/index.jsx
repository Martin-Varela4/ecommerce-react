import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';
import Login from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <div style={{ padding: '1rem' }}>404 - No encontrado</div> },
    ],
  },
]);
