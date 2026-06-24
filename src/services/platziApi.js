// CAMBIAMOS LA URL BASE POR LA OFICIAL ACTUALIZADA
const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error('Error al obtener categorías');
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Error al obtener el detalle del producto');
  return response.json();
};