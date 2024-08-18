import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './CustomMapModal.css'; // Importa el nuevo archivo CSS
import './Dash.css';
import Sidebar from './Sidebar';

const GestAct = () => {
  Modal.setAppElement('#root');

  const [activities, setActivities] = useState([]);
  const [mapModalIsOpen, setMapModalIsOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 19.432608, lng: -99.133209 }); // Coordenadas iniciales
  const navigate = useNavigate();

  // Coordenadas de las áreas
  const areaCoordinates = {
    'Producción': { lat: 20.8323815, lng: -100.4304209 },
    'Control de Calidad': { lat: 20.8324664, lng: -100.4325934 },
    'Mantenimiento': { lat: 20.8302597, lng: -100.4301402 },
    'Gestión de Residuos': { lat: 20.8289887, lng: -100.4328402 },
  };

  // Cargar la API de Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDd9-EpgQGtD0sdSGvwHG03IZ_ybGuV_lA', // Reemplaza con tu clave de API de Google Maps
  });

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

  const openMapModal = (area) => {
    // Obtener las coordenadas según el área
    const coordinates = areaCoordinates[area];
    if (coordinates) {
      setMapCenter(coordinates);
      setMapModalIsOpen(true);
    } else {
      console.error('Área no encontrada', area);
    }
  };

  const closeMapModal = () => {
    setMapModalIsOpen(false);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1>GESTIÓN DE ACTIVIDADES</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha asignada</th>
                <th>Fecha límite</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Asignado</th>
                <th>Asignó</th>
                <th>Descripción</th>
                <th>Área</th>
                <th>Acciones</th>
                <th>Mapa</th>
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
                  <td>{activity.nom_usu_asignado}</td>
                  <td>{activity.nom_usu_que_asigno}</td>
                  <td>{activity.descripcion}</td>
                  <td>{activity.area}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEditarActividad(activity.id_act)}>Editar</button>
                    <button className="btn btn-delete" onClick={() => handleEliminarActividad(activity.id_act)}>Eliminar</button>
                  </td>
                  <td>
                    <button className="btn btn-map" onClick={() => openMapModal(activity.area)}>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-add" onClick={handleAgregarActividad}> + Agregar Actividad</button>
          <Modal
            isOpen={mapModalIsOpen}
            onRequestClose={closeMapModal}
            contentLabel="Mapa"
            className="custom-modal"
            overlayClassName="custom-overlay"
            ariaHideApp={false}
          >
            <div className="modal-content">
              <span className="close" onClick={closeMapModal}>&times;</span>
              <h2 style={{ textAlign: 'center', margin: '10px' }}>Ubicación del área</h2>
              {isLoaded ? (
                <div className="map-container">
                  <GoogleMap
                    mapContainerStyle={{ height: "100%", width: "100%" }}
                    center={mapCenter}
                    zoom={15}
                  >
                    <Marker position={mapCenter} /> {/* Añade el marcador rojo */}
                  </GoogleMap>
                </div>
              ) : (
                <p style={{ textAlign: 'center' }}>Cargando mapa...</p>
              )}
            </div>
          </Modal>
        </section>
      </main>
    </div>
  );
};

export default GestAct;
