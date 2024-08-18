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
        console.log("Fetched data:", data);
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

  const handleToggleEstatus = (id, currentEstatus) => {
    const newEstatus = currentEstatus === 1 ? 0 : 1;
    const confirmMessage = newEstatus === 0 
      ? "¿Estás seguro de eliminar este empleado?" 
      : "¿Estás seguro de activar este empleado?";
    
    if (window.confirm(confirmMessage)) {
      fetch(`http://localhost:8080/webJacketOn/server/updateEmployeeStatus.php?id_usu=${id}&estatus=${newEstatus}`, {
        method: 'GET', 
      })
      .then(response => response.json())
      .then(data => {
        console.log("Server response:", data);
        if (data.success) {
          const updatedEmployees = employees.map(employee => {
            if (employee.id_usu === id) {
              return { ...employee, estatus: newEstatus };
            }
            return employee;
          });
          setEmployees(updatedEmployees);
        } else {
          alert('Error cambiando estatus del empleado: ' + data.error);
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
                  <td>{employee.estatus}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEditarEmpleado(employee.id_usu)}>Editar</button>
                    <button
                      className={`btn ${employee.estatus === 1 ? 'btn-delete' : 'btn-activate'}`}
                      onClick={() => handleToggleEstatus(employee.id_usu, employee.estatus)}
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
