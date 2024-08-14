import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';
import './Dash.css';
import Sidebar from './Sidebar';

const Mapa = () => {
  const containerStyle = {
    width: '100%',
    height: '500px'
  };

  const center = {
    lat: -34.397, // Coordenadas iniciales del mapa
    lng: 150.644
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1> GOOGLE MAPS</h1>
          <LoadScript
            googleMapsApiKey="AIzaSyDd9-EpgQGtD0sdSGvwHG03IZ_ybGuV_lA" // Reemplaza con tu clave API
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
            >
              {/* Puedes agregar marcadores u otros componentes aquí */}
            </GoogleMap>
          </LoadScript>
        </section>
      </main>
    </div>
  );
};

export default Mapa;
