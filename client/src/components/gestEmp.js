import React, { useState } from 'react';
import './Dash.css';
import Sidebar from './Sidebar';

//funcionalidad para el boton de user
const GestEmp = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dashboard">
     <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1>GESTION DE EMPLEADO</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>E-Mail</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado1@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Editar</button>
                  <button className="btn btn-delete">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado2@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Editar</button>
                  <button className="btn btn-delete">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado3@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Editar</button>
                  <button className="btn btn-delete">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado4@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Editar</button>
                  <button className="btn btn-delete">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Nombre1</td>
                <td>Apellido1</td>
                <td>empleado5@gmail.com</td>
                <td>
                  <button className="btn btn-edit">Editar</button>
                  <button className="btn btn-delete">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-add">+ AGREGAR NUEVO EMPLEADO</button>
        </section>
      </main>
    </div>
  );
};

export default GestEmp;
