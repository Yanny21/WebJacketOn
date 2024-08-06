import { Alert } from '@mui/material';
import React, { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './formularios.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setShowWarningAlert(false); // Resetear alerta de advertencia
    setShowInfoAlert(false); // Resetear alerta de información
    setShowSuccessAlert(false); // Resetear alerta de éxito

    try {
      const response = await fetch('http://localhost/webJacketOn/server/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Mostrar alerta de login exitoso
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate('/supervisores');
        }, 3000); // Ocultar la alerta después de 3 segundos y redirigir
      } else {
        // Mostrar alertas según el mensaje recibido
        if (data.message === 'Ya tienes una sesión activa en otro dispositivo.') {
          setShowInfoAlert(true); // Mostrar alerta de información
        } else {
          setShowWarningAlert(true); // Mostrar alerta de advertencia
        }
        setError(data.message); // Mostrar el mensaje de error específico
      }
    } catch (error) {
      setError('Error al conectarse con el servidor.');
    }
  };

  return (
    <div className="login-container">
      <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Inicio de sesión</h2>
          <p>Ingrese sus datos para ingresar</p>
          {showSuccessAlert && (
            <Alert severity="success" variant="filled" style={{ marginBottom: '10px' }}>
              ¡Inicio de sesión exitoso!
            </Alert>
          )}
          {showWarningAlert && (
            <Alert severity="warning" variant="filled" style={{ marginBottom: '10px' }}>
              El correo electrónico o la contraseña son incorrectos.
            </Alert>
          )}
          {showInfoAlert && (
            <Alert severity="info" variant="filled" style={{ marginBottom: '10px' }}>
              Ya tienes una sesión activa en otro dispositivo.
            </Alert>
          )}
          <form className="login-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="email@domain.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Ingresar</button>
            {/* Mostrar el mensaje de error solo si no hay alertas específicas */}
            {error && !showSuccessAlert && !showWarningAlert && !showInfoAlert && (
              <p className="error-message">{error}</p>
            )}
          </form>
          <p className="continuar-con">Continuar con</p>
          <div className="social-login">
            <button className="google-login"><FaGoogle /> Google</button>
            <button className="facebook-login"><FaFacebook /> Facebook</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;