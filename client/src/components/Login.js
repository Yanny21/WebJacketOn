import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Named export
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './formularios.css';

const Login = () => {
  const clientId = "640528397519-uv5d8no0n9hf5gsglt3ci5meedalq6kc.apps.googleusercontent.com";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/webJacketOn/server/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          icon: 'success',
          text: data.message,
        }).then(() => {
          localStorage.setItem('userSession', JSON.stringify({ email }));
          navigate('/supervisores'); // Redirige a la vista de gestión de supervisores
        });
      } else {
        Swal.fire({
          title: '¡Ups!',
          icon: 'warning',
          text: data.message,
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
        title: 'Error al conectarse con el servidor',
        icon: 'error',
        text: error.message,
      });
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google Login Response:', response);
    try {
      const decoded = jwtDecode(response.credential); // Usa jwtDecode aquí
      const email = decoded.email || decoded.email_address;

      if (email) {
        axios.post('http://localhost:8080/webJacketOn/server/googleLogin.php', {
          email: email
        }).then((response) => {
          if (response.data.success) {
            Swal.fire({
              title: '¡Inicio de sesión exitoso!',
              icon: 'success',
              text: 'Has iniciado sesión con Google.',
            }).then(() => {
              localStorage.setItem('userSession', JSON.stringify({ email }));
              navigate('/supervisores'); // Redirigir a la vista de gestión de supervisores
            });
          } else {
            Swal.fire({
              title: '¡Ups!',
              icon: 'warning',
              text: response.data.message,
            });
          }
        }).catch((error) => {
          console.error('Error al realizar la solicitud', error);
          Swal.fire({
            title: 'Error al realizar la solicitud',
            icon: 'error',
            text: error.message,
          });
        });
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'No se pudo obtener el correo electrónico.',
        });
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Error al procesar la respuesta de Google.',
      });
    }
  };

  const handleGoogleLoginFailure = () => {
    console.log('Google Login Failed');
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: 'Error al iniciar sesión con Google.',
    });
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
          </form>
          <p className="continuar-con">Continuar con</p>
          <div className="social-login">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin 
                clientId={clientId}
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;