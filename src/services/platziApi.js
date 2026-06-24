const BASE_URL = 'https://platzi.com';

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Error al traer los productos');
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Error al traer el producto');
  return response.json();
};


export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Credenciales incorrectas');
  return response.json(); 
};

export const getUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('No se pudo obtener el perfil');
  return response.json();
};