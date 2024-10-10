import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from '../Styles/Login.css';
import MakeupPhoto from '../Assets/Makeup_Photo.jpg'; 
import Logo from '../Assets/Makeup.png'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5168/api/Login/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: email,
            Contrasena: password,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Credenciales incorrectas. Inténtalo de nuevo.');
        }
  
        const data = await response.json();
        console.log(data)
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuarioId', data.usuarioID);
        
        navigate('/dashboard'); 
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div className="login-container">
        <div className="image-section">
          <img src={MakeupPhoto} alt="Makeup" className="background-image" />
        </div>
        <div className="form-section">
          <img src={Logo} alt="Logo" className="logo" />
          <h2 className='title'>The Crow Makeup</h2>
          <h4 className='subtitle mb-4'>Administración</h4>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin} >
            <div>
              <label className='m-2'>Email:</label>
              <input
                type="email"
                className='mt-1'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='m-2'>Contraseña:</label>
              <input
              className='mt-1'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className='btnIniciar mt-3'>Iniciar Sesión</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;