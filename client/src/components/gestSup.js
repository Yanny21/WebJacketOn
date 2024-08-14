import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dash.css';
import Sidebar from './Sidebar';

const GestSup = () => {
  const [supervisors, setSupervisors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (!session) {
      navigate('/login');
    } else {
      fetchSupervisors();
    }
  }, []);

  const fetchSupervisors = () => {
    fetch('http://localhost:8080/webJacketOn/server/getSupervisors.php')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // Log para verificar datos recibidos
        setSupervisors(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  };

  const handleAgregarSupervisor = () => {
    navigate('/registro');
  };

  const handleEditarSupervisor = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleToggleEstatus = (id, currentEstatus) => {
    const newEstatus = currentEstatus === 1 ? 0 : 1;
    const confirmMessage = newEstatus === 0 
      ? "¿Estás seguro de eliminar este supervisor?" 
      : "¿Estás seguro de activar este supervisor?";
    
    if (window.confirm(confirmMessage)) {
      fetch(`http://localhost:8080/webJacketOn/server/updateSupervisorStatus.php?id_usu=${id}&estatus=${newEstatus}`, {
        method: 'GET',  // Asegurarse de que sea GET si se usa $_GET en PHP
      })
      .then(response => response.json())
      .then(data => {
        console.log("Server response:", data);  // Log para verificar la respuesta del servidor
        if (data.success) {
          // Actualizar la lista de supervisores después de cambiar el estatus
          const updatedSupervisors = supervisors.map(supervisor => {
            if (supervisor.id_usu === id) {
              return { ...supervisor, estatus: newEstatus };
            }
            return supervisor;
          });
          setSupervisors(updatedSupervisors);
        } else {
          alert('Error cambiando estatus del supervisor: ' + data.error);
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
          <h1>GESTION DE SUPERVISORES</h1>
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
              {supervisors.map(supervisor => (
                <tr key={supervisor.id_usu}>
                  <td>{supervisor.nom_usu}</td>
                  <td>{supervisor.app_usu}</td>
                  <td>{supervisor.email_usu}</td>
                  <td>{supervisor.estatus === 1 ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEditarSupervisor(supervisor.id_usu)}>Editar</button>
                    <button
                      className={`btn ${supervisor.estatus === 1 ? 'btn-delete' : 'btn-activate'}`}
                      onClick={() => handleToggleEstatus(supervisor.id_usu, supervisor.estatus)}
                    >
                      {supervisor.estatus === 1 ? 'Eliminar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-add" onClick={handleAgregarSupervisor}>+ AGREGAR NUEVO SUPERVISOR</button>
        </section>
      </main>
    </div>
  );
};

export default GestSup;
