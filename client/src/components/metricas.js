import React, { useState } from 'react';
import './Dash.css';
import Sidebar from './Sidebar';
//funcionalidad para el boton de user
const Metricas = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dashboard">
          <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1>METRICAS EMPLEADOS</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>E-Mail</th>
                <th>Metricas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado1@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Ambientales</button>
                  <button className="btn btn-delete">Personales</button>
                </td>
              </tr>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado2@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Ambientales</button>
                  <button className="btn btn-delete">Personales</button>
                </td>
              </tr>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado3@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Ambientales</button>
                  <button className="btn btn-delete">Personales</button>
                </td>
              </tr>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado4@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Ambientales</button>
                  <button className="btn btn-delete">Personales</button>
                </td>
              </tr>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado5@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Ambientales</button>
                  <button className="btn btn-delete">Personales</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Metricas;
