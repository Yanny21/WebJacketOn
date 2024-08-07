import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dash.css';
import Sidebar from './Sidebar';

const GestEmp = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (!session) {
      navigate('/login');
    } else {
      fetchEmployees();
    }
  }, [navigate]); // Incluye 'navigate' en el array de dependencias

  const fetchEmployees = () => {
    fetch('http://localhost/webJacketOn/server/getEmployees.php')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // Log para verificar datos recibidos
        setEmployees(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  };

  const handleAgregarEmpleado = () => {
    navigate('/registroEmp');
  };

  const handleEditarEmpleado = (id) => {
    navigate(`/editEmp/${id}`);
  };

  const handleEliminarEmpleado = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este empleado?")) {
      fetch(`http://localhost/webJacketOn/server/updateEmployeeStatus.php?id_usu=${id}&estatus=0`, {
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Vuelve a hacer una solicitud para obtener la lista actualizada de empleados
          fetchEmployees();
        } else {
          alert('Error eliminando empleado: ' + data.error);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1>GESTIÓN DE EMPLEADOS</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>E-Mail</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id_usu}>
                  <td>{employee.nom_usu}</td>
                  <td>{employee.app_usu}</td>
                  <td>{employee.email_usu}</td>
                  <td>{employee.estatus === 0 ? 'Inactivo' : 'Activo'}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEditarEmpleado(employee.id_usu)}>Editar</button>
                    <button className="btn btn-delete" onClick={() => handleEliminarEmpleado(employee.id_usu)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-add" onClick={handleAgregarEmpleado}>+ AGREGAR NUEVO EMPLEADO</button>
        </section>
      </main>
    </div>
  );
};

export default GestEmp;
