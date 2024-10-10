import React from 'react';
import { Navigate } from 'react-router-dom';

// Este componente envuelve las rutas que necesitan estar protegidas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Revisamos si hay un token en localStorage
  return token ? children : <Navigate to="/login" />;  // Si hay token, muestra el contenido, si no, redirige al login
};

export default PrivateRoute;
