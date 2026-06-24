import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/platziApi';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        
        const data = await fetchProducts();
        
        
        const productosLimpios = data.filter((product, index, self) => 
          product.title && 
          product.title.length > 3 && 
          self.findIndex(p => p.title.toLowerCase() === product.title.toLowerCase()) === index
        );

        setProducts(productosLimpios);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return { products, loading, error };
};
