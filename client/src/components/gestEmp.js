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
  }, [navigate]);

  const fetchEmployees = () => {
    fetch('http://localhost:8080/webJacketOn/server/getEmployees.php')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleAgregarEmpleado = () => {
    navigate('/registroEmp');
  };

  const handleEditarEmpleado = (id) => {
    navigate(`/editEmp/${id}`);
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const action = newStatus === 0 ? 'eliminar' : 'activar';
    if (window.confirm(`¿Estás seguro de ${action} este empleado?`)) {
      fetch(`http://localhost:8080/webJacketOn/server/updateEmployeeStatus.php?id_usu=${id}&estatus=${newStatus}`, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            fetchEmployees(); // Actualiza la lista de empleados
          } else {
            alert(`Error al ${action} empleado: ${data.error}`);
          }
        })
        .catch(error => {
          console.error(`Error al ${action} empleado:`, error);
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
                  <td>{employee.estatus === 1 ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEditarEmpleado(employee.id_usu)}>Editar</button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleToggleStatus(employee.id_usu, employee.estatus)}
                    >
                      {employee.estatus === 1 ? 'Eliminar' : 'Activar'}
                    </button>
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
