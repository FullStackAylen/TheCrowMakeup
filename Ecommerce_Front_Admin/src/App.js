import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import Categoria from './Views/Categoria/Categoria';
import CategoriaForm from './Views/Categoria/CategoriaForm'; // Importa el formulario
import Inventario from './Views/Inventario/Inventario';
import InventarioForm  from './Views/Inventario/InventarioForm';
import Marca from './Views/Marca/Marca';
import MarcaForm from './Views/Marca/MarcaForm';
import Oferta from './Views/Oferta/Oferta';
import OfertaForm from './Views/Oferta/OfertaForm';
import Producto from './Views/Productos/Producto';
import ProductoForm from './Views/Productos/ProductosForm';
import Usuario from './Views/Usuario/Usuario';
import UsuarioForm from './Views/Usuario/UsuarioForm';
import HistorialUsuario from './Views/HistorialUsuario/Historial';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route 
                  path="/dashboard" 
                  element={
                      <PrivateRoute>
                          <Dashboard />
                      </PrivateRoute>
                  } 
              >
                  {/* Define sub-rutas que se renderizarán dentro de Dashboard */}
                  <Route path="categoria" element={<Categoria />} />
                  <Route path="categoria/form" element={<CategoriaForm />} /> 
                  <Route path="categoria/form/:categoria" element={<CategoriaForm />} /> 
                  <Route path="inventario" element={<Inventario />} />
                  <Route path="inventario/form" element={<InventarioForm />} /> 
                  <Route path="inventario/form/:id" element={<InventarioForm />} /> 
                  <Route path="marca" element={<Marca />} />
                  <Route path="marca/form" element={<MarcaForm />} /> 
                  <Route path="marca/form/:id" element={<MarcaForm />} /> 
                  <Route path="oferta" element={<Oferta />} />
                  <Route path="oferta/form" element={<OfertaForm />} /> 
                  <Route path="oferta/form/:id" element={<OfertaForm />} /> 
                  <Route path="producto" element={<Producto />} />
                  <Route path="producto/form" element={<ProductoForm />} /> 
                  <Route path="producto/form/:id" element={<ProductoForm />} /> 
                  <Route path="usuario" element={<Usuario />} />
                  <Route path="usuario/form" element={<UsuarioForm />} /> 
                  <Route path="usuario/form/:id" element={<UsuarioForm />} /> 
                  <Route path="historial" element={<HistorialUsuario />} />
              </Route>
          </Routes>
      </Router>
  );
}
export default App;
