import { collection, getDocs, query } from 'firebase/firestore';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import React, { useEffect, useState } from 'react';
import './Dash.css';
import { db } from './firebaseConfig';
import Sidebar from './Sidebar';

// Initialize the HighchartsMore module
HighchartsMore(Highcharts);

const Metricas = () => {
  const [users, setUsers] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoMetrica, setTipoMetrica] = useState('');
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('HeartRate');

  // Fetch users with devices
  useEffect(() => {
    fetch('http://localhost/webJacketOn/server/getUsersWithDevices.php')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error al obtener los usuarios:', error));
  }, []);

  // Fetch device data
  useEffect(() => {
    if (selectedDevice) {
      const fetchDeviceData = async () => {
        try {
          const deviceQuery = query(collection(db, selectedDevice));
          const querySnapshot = await getDocs(deviceQuery);
          const data = querySnapshot.docs.map(doc => doc.data());

          const formattedData = data.map(device => ({
            x: new Date(device.createdAt.seconds * 1000).getTime(), // Convertir a milisegundos
            y: device[selectedMetric]
          }));

          setDeviceData(formattedData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching device data:', error);
          setError(error.message);
          setLoading(false);
        }
      };

      fetchDeviceData();
    }
  }, [selectedDevice, selectedMetric]);

  const manejarClickBoton = (tipo, device) => {
    setTipoMetrica(tipo);
    setSelectedDevice(device);
    setMostrarModal(true);
    setSelectedMetric(tipo === 'Personales' ? 'HeartRate' : 'MQ7_AO'); // Valor por defecto según el tipo de métrica
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setTipoMetrica('');
    setSelectedMetric('HeartRate'); // Resetear la métrica seleccionada al cerrar el modal
  };

  // Highcharts options
  const options = {
    chart: {
      type: 'line',
      zoomType: 'x',
      backgroundColor: 'rgba(240, 248, 255, 0.8)', // AliceBlue background
    },
    title: {
      text: tipoMetrica === 'Personales'
        ? (selectedMetric === 'HeartRate' ? 'Ritmo Cardíaco a lo largo del tiempo' : 'Nivel de Oxígeno en la Sangre (SPO2)')
        : selectedMetric === 'MQ7_AO' ? 'Concentración de CO (MQ7)' :
          selectedMetric === 'MQ135_AO' ? 'Concentración de Gases Tóxicos (MQ135)' :
          selectedMetric === 'Humidity' ? 'Humedad Relativa' : 'Temperatura Ambiental',
      style: {
        fontSize: '20px',
        color: '#333333',
        fontWeight: 'bold'
      }
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Fecha',
        style: {
          fontWeight: 'bold',
          color: '#333333'
        }
      },
      labels: {
        format: '{value:%Y-%m-%d}'
      }
    },
    yAxis: {
      title: {
        text: selectedMetric === 'HeartRate' ? 'Ritmo Cardíaco (bpm)' :
              selectedMetric === 'SpO2' ? 'SPO2 (%)' :
              selectedMetric === 'MQ7_AO' || selectedMetric === 'MQ135_AO' ? 'Concentración (ppm)' :
              selectedMetric === 'Humidity' ? 'Humedad (%)' : 'Temperatura (°C)',
        style: {
          fontWeight: 'bold',
          color: '#333333'
        }
      }
    },
    series: [{
      data: deviceData,
      name: selectedMetric === 'HeartRate' ? 'Ritmo Cardíaco' :
            selectedMetric === 'SpO2' ? 'SPO2' :
            selectedMetric === 'MQ7_AO' ? 'MQ7' :
            selectedMetric === 'MQ135_AO' ? 'MQ135' :
            selectedMetric === 'Humidity' ? 'Humedad' : 'Temperatura',
      color: '#007bff',
    }],
    tooltip: {
      useHTML: true,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#333333',
      borderRadius: 10,
      headerFormat: '<table>',
      pointFormat: '<tr><th>Fecha:</th><td>{point.x:%Y-%m-%d}</td></tr>' +
                   `<tr><th>${selectedMetric}:</th><td>{point.y}</td></tr>`,
      footerFormat: '</table>',
      followPointer: true,
      shadow: true,
    },
    credits: {
      enabled: false
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1>MÉTRICAS EMPLEADOS</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>E-Mail</th>
                <th>Métricas</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id_usu}>
                  <td>{user.nom_usu}</td>
                  <td>{user.app_usu}</td>
                  <td>{user.email_usu}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => manejarClickBoton('Ambientales', user.dispositivo)}>Ambientales</button>
                    <button className="btn btn-delete" onClick={() => manejarClickBoton('Personales', user.dispositivo)}>Personales</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Modal dinámico */}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>&times;</span>
            <h2>{tipoMetrica === 'Personales' ? 'Métricas Personales' : 'Métricas Ambientales'}</h2>

            {/* Selector de métrica */}
            <div>
              <label>Selecciona una métrica:</label>
              <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
                {tipoMetrica === 'Personales' ? (
                  <>
                    <option value="HeartRate">Ritmo Cardíaco</option>
                    <option value="SpO2">SPO2</option>
                  </>
                ) : (
                  <>
                    <option value="MQ7_AO">MQ7</option>
                    <option value="MQ135_AO">MQ135</option>
                    <option value="Humidity">Humedad</option>
                    <option value="Temperature">Temperatura</option>
                  </>
                )}
              </select>
            </div>

            {loading ? (
              <p>Cargando gráfico...</p>
            ) : error ? (
              <p>Error al cargar los datos: {error}</p>
            ) : (
              <HighchartsReact highcharts={Highcharts} options={options} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Metricas;
