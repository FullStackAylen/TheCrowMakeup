import React, { useState } from 'react';
import { Link,Outlet,useNavigate } from 'react-router-dom';
import '../Styles/Dashboard.css'; 
import logo from '../Assets/Makeup.png'; 
import logoutIcon from '../Assets/Logout.png'

const Dashboard = () => {
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        const userId = localStorage.getItem('usuarioId'); 
        const token = localStorage.getItem('token'); 
        
        if (!userId) {
            console.error('No se encontró el ID del usuario.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5168/api/Login/Logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userId), 
            });
    
            if (response.ok) {
                localStorage.removeItem('usuarioId'); 
                localStorage.removeItem('token'); 
                navigate('/login'); 
            } else {
                const errorMessage = await response.json(); 
                console.error('Error al cerrar sesión:', errorMessage);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src={logo} alt="Logo de The Crow Make Up" className="logo" />
                    <h1>The Crow Makeup</h1>
                    <h2 className='subtitleAd'>Administración</h2>
                </div>
                <nav className="navbar">
                    <ul>
                        <li><Link to="/dashboard/categoria">Categorías</Link></li>
                        <li><Link to="/dashboard/inventario">Inventario</Link></li>
                        <li><Link to="/dashboard/marca">Marcas</Link></li>
                        <li><Link to="/dashboard/oferta">Ofertas</Link></li>
                        <li><Link to="/dashboard/producto">Productos</Link></li>
                        <li><Link to="/dashboard/usuario">Usuarios</Link></li>
                        <li><Link to="/dashboard/historial">Historial de Usuarios</Link></li>
                    </ul>
                </nav>
                <img 
                    src={logoutIcon} 
                    alt="Logout" 
                    className="logout-icon" 
                    onClick={handleLogout} 
                />
            </aside>
            <main className="main-content">
                <h2>Bienvenida al panel de administración</h2>
                <p>Gestiona todas las secciones desde aquí.</p>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;