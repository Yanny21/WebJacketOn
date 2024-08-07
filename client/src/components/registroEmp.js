import React from 'react';
import { useNavigate } from 'react-router-dom';
import './formularios.css';

const RegistroEmp = () => {

    const navigate = useNavigate();

    const handleRegresar = () => {
        navigate('/empleados');
      };

  return (
    <div className="login-container">
      <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Registro de empleados</h2>
          <p>Ingrese todos los datos</p>
          <form className="login-form">
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellido" />
            <input type="email" placeholder="email@domain.com" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit" className="login-button">Registrar</button>
          </form>
          <button className="pregunta-cuenta-button" onClick={handleRegresar}>Volver</button>
        </div>
      </main>
    </div>
  );
};

export default RegistroEmp;