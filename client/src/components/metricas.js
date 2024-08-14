import React, { useState, useEffect, useMemo } from 'react';
import './Dash.css';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale, TimeScale } from 'chart.js';

// Registra las escalas necesarias
Chart.register(CategoryScale, LinearScale, TimeScale);

const Metricas = () => {
  const [metricas, setMetricas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/webJacketOn/server/getMetrics.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMetricas(data);
      })
      .catch(error => {
        setError('Error fetching metrics: ' + error.message);
      });
  }, []);

  const data = {
    datasets: [{
      label: 'Métricas Ambientales',
      data: metricas,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const options = useMemo(() => ({
    scales: {
      x: {
        type: 'time', // Cambiado de 'linear' a 'time'
        position: 'bottom',
        time: {
          unit: 'day' // Ajusta esto según el formato de tus datos
        },
        title: {
          display: true,
          text: 'Tiempo'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Valores'
        }
      }
    }
  }), []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1>METRICAS AMBIENTALES</h1>
          {metricas.length > 0 ? (
            <div className="chart-container">
              <Line data={data} options={options} />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Metricas;
