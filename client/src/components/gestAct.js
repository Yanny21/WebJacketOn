import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dash.css';
import Sidebar from './Sidebar';

const GestAct = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (!session) {
      navigate('/login');
    } else {
      fetchActivities();
    }
  }, [navigate]);

  const fetchActivities = () => {
    fetch('http://localhost:8080/webJacketOn/server/getActivities.php')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched activities:", data);
        setActivities(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  };

  const handleAgregarActividad = () => {
    navigate('/registroAct');
  };

  const handleEditarActividad = (id) => {
    navigate(`/editAct/${id}`);
  };

  const handleEliminarActividad = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta actividad?")) {
      fetch(`http://localhost:8080/webJacketOn/server/deleteActivity.php?id_act=${id}&estatus=0`, {
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setActivities(activities.filter(activity => activity.id_act !== id));
        } else {
          alert('Error eliminando actividad: ' + data.error);
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
                <th>Asignado a</th>
                <th>Asignó</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id_act}>
                  <td>{activity.actividad}</td>
                  <td>{activity.fech_asig}</td>
                  <td>{activity.fech_lim}</td>
                  <td>{activity.fech_ini}</td>
                  <td>{activity.fech_fin}</td>
                  <td>{activity.area}</td>
                  <td>{activity.nom_usu_asignado}</td>
                  <td>{activity.nom_usu_que_asigno}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEditarActividad(activity.id_act)}>Editar</button>
                    <button className="btn btn-delete" onClick={() => handleEliminarActividad(activity.id_act)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-add" onClick={handleAgregarActividad}>+ AGREGAR NUEVA ACTIVIDAD</button>
        </section>
      </main>
    </div>
  );
};

export default GestAct;
