import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useState } from 'react';
import './Dash.css';
import Sidebar from './Sidebar';

// Scatter Plot - Gráfica de Dispersión
const scatterOptions = {
  chart: {
    type: 'scatter',
    zoomType: 'xy'
  },
  title: {
    text: 'Relación entre Niveles de CO2 y Frecuencia Cardíaca en el Trabajo'
  },
  xAxis: {
    title: {
      text: 'Niveles de CO2 (ppm)'
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
    data: [
      [400, 70],  // Ejemplo: [Nivel de CO2, Frecuencia Cardíaca]
      [500, 75],
      [600, 80],
      [700, 85],
      [800, 90]
    ],
    marker: {
      radius: 5
    }
  }]
};

// Stacked Bar - Gráfica de Barras
const stackedBarOptions = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Distribución de Tareas e Incidencias por Área'
  },
  xAxis: {
    categories: ['Área A', 'Área B', 'Área C']
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total (Horas)'
    },
    stackLabels: {
      enabled: true
    }
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    x: -30,
    y: 25,
    floating: true,
    borderWidth: 1,
    backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true
  },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
    bar: {
      stacking: 'normal',
      dataLabels: {
        enabled: true
      }
    }
  },
  series: [{
    name: 'Tareas Completadas',
    data: [5, 3, 4]
  }, {
    name: 'Incidencias Identificadas',
    data: [2, 2, 3]
  }]
};

// Area-spline Chart - Gráfica de Área
const areaSplineOptions = {
  chart: {
    type: 'areaspline'
  },
  title: {
    text: 'Tendencias de Niveles de CO y Calidad del Aire a lo Largo del Tiempo'
  },
  xAxis: {
    categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    title: {
      text: 'Meses'
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
      data: [400, 420, 430, 410, 450, 460],
      color: '#FFD047', // Color rojo 
      tooltip: {
        valueSuffix: ' ppm'
      }
    },
    {
      name: 'Calidad del Aire (ppm)',
      data: [200, 180, 190, 210, 220, 205],
      color: '#4682B4', // Color azul 
      tooltip: {
        valueSuffix: ' ppm'
      }
    }
  ]
};


const Graficasyrep = () => {
  //   controlar qué gráfica se muestra
  const [showChart, setShowChart] = useState(null);

  //  manejar clic en los botones
  const handleButtonClick = (chartType) => {
    setShowChart(chartType);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <section className="employee-management">
          <h1 className="h1Chart">GRAFICAS Y REPORTES</h1>
          
          {/*  seleccionar el tipo de gráfica */}
          <div className="button-group">
            <button className="chart-button" onClick={() => handleButtonClick('scatter')}>CO2 y Frecuencia Cardíaca</button>
            <button className="chart-button1" onClick={() => handleButtonClick('bar')}>Tareas e Incidencias por Área</button>
            <button className="chart-button" onClick={() => handleButtonClick('area-spline')}>Calidad de Aire</button>
          </div>
          
          {/* Renderizar la gráfica basada en el botón clickeado */}
          {showChart === 'scatter' && (
            <div className="chart-container">
              <HighchartsReact
                highcharts={Highcharts}
                options={scatterOptions}
              />
            </div>
          )}
          {showChart === 'bar' && (
            <div className="chart-container">
              <HighchartsReact
                highcharts={Highcharts}
                options={stackedBarOptions}
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
          
          <button className="chart-buttonR">Generar reporte</button>
        </section>
      </main>
    </div>
  );
};

export default Graficasyrep;
