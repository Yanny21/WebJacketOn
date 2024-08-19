import Alert from '@mui/material/Alert'; // Importa la alerta de Material-UI
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formularios.css';

const RegistroEmp = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/empleados');
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (!hasUpperCase) {
      return 'La contraseña debe contener al menos una letra mayúscula.';
    }
    if (!hasLowerCase) {
      return 'La contraseña debe contener al menos una letra minúscula.';
    }
    if (!hasNumber) {
      return 'La contraseña debe contener al menos un número.';
    }
    if (!hasSpecialChar) {
      return 'La contraseña debe contener al menos un carácter especial.';
    }
    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const formData = new FormData();
    formData.append('nom_usu', nombre);
    formData.append('app_usu', apellido);
    formData.append('email_usu', email);
    formData.append('pass_usu', password);

    fetch('http://localhost/webJacketOn/server/registerEmployee.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigate('/empleados');
      } else {
        setError('Error registrando Empleado: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setError('Hubo un problema con la solicitud. Intente nuevamente.');
    });
  };

  return (
    <div className="login-container">
      <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Registro de Empleados</h2>
          <p>Ingrese todos los datos</p>
          {error && <Alert severity="warning" className="alert-margin">{error}</Alert>} {/* Alerta con margen */}
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
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
            <button type="submit" className="login-button">Registrar</button>
          </form>
          <button className="pregunta-cuenta-button" onClick={handleRegresar}>Volver</button>
        </div>
      </main>
    </div>
  );
};

export default RegistroEmp;
