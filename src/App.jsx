import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import { CssBaseline } from '@mui/material'; 
import { theme } from './theme/muuiTheme'; 
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
