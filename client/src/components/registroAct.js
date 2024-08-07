import React from 'react';
import { useNavigate } from 'react-router-dom';
import './formularios.css';

const RegistroAct = () => {

    const navigate = useNavigate();

    const handleRegresar = () => {
        navigate('/actividades');
      };
    
  return (
    <div className="login-container">
      <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Registrar Actividades</h2>
          <p>Ingrese todos los datos</p>
          <form className="login-form">
          <input type="text" placeholder="Actividad" />
            <label>
              Fecha límite
              <input type="date" />
            </label>
            <label>
              Fecha Asignada
              <input type="date" />
            </label>
            <label>
              Fecha inicio
              <input type="date" />
            </label>
            <input type="text" placeholder="Área" />
            <input type="text" placeholder="Descripción" />
            <button type="submit" className="login-button">Registrar</button>
          </form>
          <button className="pregunta-cuenta-button" onClick={handleRegresar}>Volver</button>
        </div>
      </main>
    </div>
  );
};

export default RegistroAct;
