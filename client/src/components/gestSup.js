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

  const handleEliminarSupervisor = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este supervisor?")) {
      fetch(`http://localhost:8080/webJacketOn/server/updateSupervisorStatus.php?id_usu=${id}&estatus=0`, {
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Actualizar la lista de supervisores después de eliminar
          const updatedSupervisors = supervisors.map(supervisor => {
            if (supervisor.id_usu === id) {
              return { ...supervisor, estatus: 0 };
            }
            return supervisor;
          });
          setSupervisors(updatedSupervisors);
        } else {
          alert('Error eliminando supervisor: ' + data.error);
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
                    <button className="btn btn-delete" onClick={() => handleEliminarSupervisor(supervisor.id_usu)}>Eliminar</button>
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
