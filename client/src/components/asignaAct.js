import { Alert } from '@mui/material';
import React, { useState } from 'react';
import './formularios.css';

const AsignaAct = () => {
  const [actividad, setActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechLim, setFechLim] = useState('');
  const [fechIni, setFechIni] = useState('');
  const [area, setArea] = useState('');
  const [idUsuAsignado, setIdUsuAsignado] = useState('');
  const [error, setError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [showInfoAlert, setShowInfoAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setShowWarningAlert(false); // Resetear alerta de advertencia
    setShowInfoAlert(false); // Resetear alerta de información
    setShowSuccessAlert(false); // Resetear alerta de éxito

    try {
      const response = await fetch('http://localhost:8080/webJacketOn/server/actividades.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actividad,
          descripcion,
          fechLim,
          fechIni,
          area,
          idUsuAsignado
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          // Aquí puedes redirigir o hacer alguna acción adicional si es necesario
        }, 3000); // Ocultar la alerta después de 3 segundos
      } else {
        setShowWarningAlert(true); // Mostrar alerta de advertencia
        setError(data.message); // Mostrar el mensaje de error específico
      }
    } catch (error) {
      setError('Error al conectarse con el servidor.');
    }
  };

  return (
    <div className="login-container">
      <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Asignar actividad</h2>
          <p>Ingrese todos los datos</p>
          {showSuccessAlert && (
            <Alert severity="success" variant="filled" style={{ marginBottom: '10px' }}>
              ¡Actividad asignada exitosamente!
            </Alert>
          )}
          {showWarningAlert && (
            <Alert severity="warning" variant="filled" style={{ marginBottom: '10px' }}>
              {error}
            </Alert>
          )}
          <form className="login-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Nombre de la actividad" 
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder="Descripción" 
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <input 
              type="date" 
              placeholder="Fecha límite" 
              value={fechLim}
              onChange={(e) => setFechLim(e.target.value)}
              required
            />
            <input 
              type="date" 
              placeholder="Fecha inicio" 
              value={fechIni}
              onChange={(e) => setFechIni(e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder="Área" 
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder="ID del usuario asignado" 
              value={idUsuAsignado}
              onChange={(e) => setIdUsuAsignado(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Asignar actividad</button>
            {error && !showSuccessAlert && !showWarningAlert && !showInfoAlert && (
              <p className="error-message">{error}</p>
            )}
          </form>
          <p className="pregunta-cuenta">Volver</p>
        </div>
      </main>
    </div>
  );
};

export default AsignaAct;
