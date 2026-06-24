import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext'; 

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  );
}
