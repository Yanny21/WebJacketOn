import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formularios.css';

const RegistroAct = () => {
  const [actividad, setActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fech_asig, setFechAsig] = useState('');
  const [fech_lim, setFechLim] = useState('');
  const [area, setArea] = useState('');
  const [id_usu_asignado, setIdUsuAsignado] = useState('');
  const [id_usu_que_asigno, setIdUsuQueAsigno] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch empleados
    fetch('http://localhost:8080/webJacketOn/server/getEmployees.php')
      .then(response => response.json())
      .then(data => setEmpleados(data))
      .catch(error => console.error('Fetch error:', error));

    // Fetch supervisores
    fetch('http://localhost:8080/webJacketOn/server/getSupervisors.php')
      .then(response => response.json())
      .then(data => setSupervisores(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  // Get today's date in the format required for datetime-local input
  const today = new Date().toISOString().slice(0, 16);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    // Validación adicional para los campos vacíos
    if (!actividad || !descripcion || !fech_asig || !fech_lim || !area || !id_usu_asignado || !id_usu_que_asigno) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    // Validación adicional para las fechas
    if (new Date(fech_lim) < new Date(fech_asig)) {
      setError('La fecha límite no puede ser anterior a la fecha de asignación.');
      return;
    }

    const formData = {
      actividad,
      descripcion,
      fech_asig,
      fech_lim,
      area,
      id_usu_asignado,
      id_usu_que_asigno,
    };

    try {
      const response = await fetch('http://localhost:8080/webJacketOn/server/addActivity.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/actividades');
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error al conectarse con el servidor.');
    }
  };

  return (
    <div className="login-container">
      <header className="registro-header">
        <h1 className="h1Act">Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Agregar Nueva Actividad</h2>
          <p>Ingrese los datos de la nueva actividad</p>
          {success && (
            <div className="alert alert-success" style={{ marginBottom: '10px' }}>
              ¡Actividad agregada exitosamente!
            </div>
          )}
          {error && (
            <div className="alert alert-warning" style={{ marginBottom: '10px' }}>
              {error}
            </div>
          )}
          <form className="login-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Nombre de la actividad" 
              value={actividad} 
              onChange={(e) => setActividad(e.target.value)} 
              required 
            />
            <textarea 
              placeholder="Descripción" 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)} 
              required
            ></textarea>
            <label htmlFor="fech_asig">Fecha asignada</label>
            <input 
              type="datetime-local" 
              value={fech_asig} 
              onChange={(e) => setFechAsig(e.target.value)} 
              required 
              min={today}
            />
            <label htmlFor="fech_lim">Fecha límite</label>
            <input 
              type="datetime-local" 
              value={fech_lim} 
              onChange={(e) => setFechLim(e.target.value)} 
              required 
              min={today}
            />
            <select 
              value={area} 
              onChange={(e) => setArea(e.target.value)} 
              required
            >
              <option value="">Seleccionar área</option>
              <option value="Producción">Producción</option>
              <option value="Control de Calidad">Control de Calidad</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Gestión de Residuos">Gestión de Residuos</option>
            </select>

            <select 
              value={id_usu_asignado} 
              onChange={(e) => setIdUsuAsignado(e.target.value)} 
              required
            >
              <option value="">Seleccionar asignado</option>
              {empleados.map(empleado => (
                <option key={empleado.id_usu} value={empleado.id_usu}>
                  {empleado.nom_usu} {empleado.app_usu}
                </option>
              ))}
            </select>
            <select 
              value={id_usu_que_asigno} 
              onChange={(e) => setIdUsuQueAsigno(e.target.value)} 
              required
            >
              <option value="">Seleccionar quien asignó</option>
              {supervisores.map(supervisor => (
                <option key={supervisor.id_usu} value={supervisor.id_usu}>
                  {supervisor.nom_usu} {supervisor.app_usu}
                </option>
              ))}
            </select>
            <button type="submit" className="login-button">Agregar Actividad</button>
          </form>
          <button className="pregunta-cuenta-button" onClick={() => navigate('/actividades')}>Regresar</button>
        </div>
      </main>
    </div>
  );
};

export default RegistroAct;
