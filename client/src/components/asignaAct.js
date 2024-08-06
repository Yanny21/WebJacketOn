import React from 'react';
import './formularios.css';

const AsignaAct = () => {
  return (
    <div className="login-container">
         <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Asignar actividad </h2>
          <p>Ingrese todos los datos</p>
          <form className="login-form">
            <input type="text" placeholder="Nombre de la actividad" />
            <input type="text" placeholder="Fecha limite" />
            <input type="text" placeholder="Fecha inicio" />
            <input type="text" placeholder="Area" />
            <input type="text" placeholder="Descripcion" />
            <button type="submit" className="login-button">Asignar actividad</button>
          </form>
          <p className="pregunta-cuenta">Volver</p>
        </div>
      </main>
    </div>
  );
};

export default AsignaAct;