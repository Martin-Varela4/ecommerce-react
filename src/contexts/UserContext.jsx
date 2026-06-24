import { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); 

  
  const registro = (nuevoUsuario) => {
    localStorage.setItem('user_db', JSON.stringify(nuevoUsuario));
    return true;
  };

  const login = (email, password) => {
    const dbUser = JSON.parse(localStorage.getItem('user_db'));
    if (dbUser && dbUser.email === email && dbUser.password === password) {
      setUsuario(dbUser);
      return true;
    }
  
    if (email === 'admin@admin.com' && password === '123456') {
      const defaultUser = { name: 'Admin Platzi', email };
      setUsuario(defaultUser);
      return true;
    }
    throw new Error('Credenciales inválidas');
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout, registro }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
