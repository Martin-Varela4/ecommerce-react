const BASE_URL = 'https://platzi.com';

// Obtener todos los productos
export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
};

// Obtener todas las categorías
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error('Error al obtener categorías');
  return response.json();
};

// Obtener detalle de un producto por ID
export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Error al obtener el detalle del producto');
  return response.json();
};
