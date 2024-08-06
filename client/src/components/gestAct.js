import React, { useState } from 'react';
import './Dash.css';
import Sidebar from './Sidebar';

const GestAct = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1>GESTION DE ACTIVIDADES</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha asignada</th>
                <th>Fecha limite</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Area</th>
                <th>Asignó</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nombre1</td>
                <td>11/11/2024</td>
                <td>12/11/2024</td>
                <td>13/11/2024</td>
                <td>14/11/2024</td>
                <td>Inyeccion</td>
                <td>Yanny Moreno</td>
                <td>
                  <button className="btn btn-edit">Editar</button>
                  <button className="btn btn-delete">Eliminar</button>
                </td>
              </tr>
              {/* Más filas aquí */}
            </tbody>
          </table>
          <button className="btn btn-add">+ AGREGAR NUEVO EMPLEADO</button>
        </section>
      </main>
    </div>
  );
};

export default GestAct;
