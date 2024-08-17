import { collection, getDocs, query } from 'firebase/firestore';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import './Dash.css';
import { db } from './firebaseConfig';
import Sidebar from './Sidebar';

const Graficasyrep = () => {
  const [showChart, setShowChart] = useState(null);
  const [scatterData, setScatterData] = useState([]);
  const [areaSplineData, setAreaSplineData] = useState({
    coLevels: [],
    airQuality: [],
    categories: []
  });
  const [humidityData, setHumidityData] = useState([]);
  const [humidityCategories, setHumidityCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const collections = ['SensorData', 'SensorData2', 'SensorData3'];
        let scatterData = [];
        let coLevels = [];
        let airQuality = [];
        let categories = [];
        let humidityByDate = {}; // Objeto para agrupar la humedad por día

        for (const collectionName of collections) {
          const deviceQuery = query(collection(db, collectionName));
          const querySnapshot = await getDocs(deviceQuery);

          querySnapshot.forEach(doc => {
            const data = doc.data();
            const createdAt = new Date(data.createdAt.seconds * 1000);
            const dateString = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;

            // Scatter Plot Data (CO vs Heart Rate)
            scatterData.push([data.MQ7_AO, data.HeartRate]);

            // Area Spline Data (CO Levels and Air Quality over Time)
            coLevels.push(data.MQ7_AO);
            airQuality.push(data.MQ135_AO);
            categories.push(dateString);

            // Agrupar la humedad por fecha
            if (!humidityByDate[dateString]) {
              humidityByDate[dateString] = [];
            }
            humidityByDate[dateString].push(data.Humidity);
          });
        }

        // Calcular la media de humedad por día
        const humidityDates = Object.keys(humidityByDate);
        const humidityAverages = humidityDates.map(date => {
          const totalHumidity = humidityByDate[date].reduce((sum, humidity) => sum + humidity, 0);
          return totalHumidity / humidityByDate[date].length;
        });

        setScatterData(scatterData);
        setAreaSplineData({
          coLevels: coLevels,
          airQuality: airQuality,
          categories: categories
        });
        setHumidityData(humidityAverages);
        setHumidityCategories(humidityDates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching device data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, []);

  const scatterOptions = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Relación entre Niveles de CO y Frecuencia Cardíaca en el Trabajo'
    },
    xAxis: {
      title: {
        text: 'Niveles de CO (ppm)'
      },
      gridLineWidth: 1
    },
    yAxis: {
      title: {
        text: 'Frecuencia Cardíaca (bpm)'
      }
    },
    series: [{
      name: 'Datos de Empleados',
      color: 'rgba(223, 83, 83, .5)',
      data: scatterData,
      marker: {
        radius: 5
      }
    }]
  };

  const areaSplineOptions = {
    chart: {
      type: 'areaspline'
    },
    title: {
      text: 'Tendencias de Niveles de CO y Calidad del Aire a lo Largo del Tiempo'
    },
    xAxis: {
      categories: areaSplineData.categories,
      title: {
        text: 'Tiempo'
      }
    },
    yAxis: {
      title: {
        text: 'Valor Medido'
      },
      min: 0
    },
    tooltip: {
      shared: true,
      valueSuffix: ' unidades'
    },
    plotOptions: {
      areaspline: {
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Niveles de CO (ppm)',
        data: areaSplineData.coLevels,
        color: '#FFD047', 
        tooltip: {
          valueSuffix: ' ppm'
        }
      },
      {
        name: 'Calidad del Aire (ppm)',
        data: areaSplineData.airQuality,
        color: '#4682B4', 
        tooltip: {
          valueSuffix: ' ppm'
        }
      }
    ]
  };

  const barChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Humedad Relativa por Día'
    },
    xAxis: {
      categories: humidityCategories, // Categorías para los días
      title: {
        text: 'Días'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Humedad Relativa (%)'
      }
    },
    series: [{
      name: 'Humedad Relativa',
      data: humidityData,
      color: '#76A5AF',
      tooltip: {
        valueSuffix: ' %'
      }
    }]
  };

  const handleButtonClick = (chartType) => {
    setShowChart(chartType);
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1 className="h1Chart">GRAFICAS Y REPORTES</h1>
          
          <div className="button-group">
            <button className="chart-button" onClick={() => handleButtonClick('scatter')}>CO y Frecuencia Cardíaca</button>
            <button className="chart-button1" onClick={() => handleButtonClick('area-spline')}>Calidad de Aire</button>
            <button className="chart-button" onClick={() => handleButtonClick('bar-chart')}>Humedad Relativa</button> {/* Nuevo botón */}
          </div>
          
          {showChart === 'scatter' && (
            <div className="chart-container">
              <HighchartsReact
                highcharts={Highcharts}
                options={scatterOptions}
              />
            </div>
          )}
          {showChart === 'area-spline' && (
            <div className="chart-container">
              <HighchartsReact
                highcharts={Highcharts}
                options={areaSplineOptions}
              />
            </div>
          )}
          {showChart === 'bar-chart' && (
            <div className="chart-container">
              <HighchartsReact
                highcharts={Highcharts}
                options={barChartOptions}
              />
            </div>
          )}
          
          <button className="chart-buttonR">Generar reporte</button>
        </section>
      </main>
    </div>
  );
};

export default Graficasyrep;
