import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);


  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

 
  const eliminarProducto = (productoId) => {
    setCarrito((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === productoId) {
          if (item.cantidad > 1) {
            acc.push({ ...item, cantidad: item.cantidad - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };


  const vaciarCarrito = () => setCarrito([]);

  
  const total = carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
