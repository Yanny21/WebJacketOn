import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './formularios.css';

const EditAct = () => {
  const { id } = useParams();  // Obtener el id de la actividad desde la URL
  const [actividad, setActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechAsig, setFechAsig] = useState('');
  const [fechLim, setFechLim] = useState('');
  const [area, setArea] = useState('');
  const [idUsuAsignado, setIdUsuAsignado] = useState('');
  const [idUsuQueAsigno, setIdUsuQueAsigno] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
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

    // Fetch actividad data para editar
    fetch(`http://localhost:8080/webJacketOn/server/getActivity.php?id_act=${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setActividad(data.actividad);
          setDescripcion(data.descripcion);
          setFechAsig(data.fech_asig);
          setFechLim(data.fech_lim);
          setArea(data.area);
          setIdUsuAsignado(data.id_usu_asignado);
          setIdUsuQueAsigno(data.id_usu_que_asigno);
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id_act: id,
      actividad,
      descripcion,
      fech_asig: fechAsig,
      fech_lim: fechLim,
      area,
      id_usu_asignado: idUsuAsignado,
      id_usu_que_asigno: idUsuQueAsigno,
    };

    fetch('http://localhost:8080/webJacketOn/server/updateActivity.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigate('/actividades');
      } else {
        alert('Error actualizando actividad: ' + data.error);
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
  };

  return (
    <div className="login-container">
      <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Editar Actividad</h2>
          <p>Edite los datos de la actividad</p>
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
            ></textarea>
            <label htmlFor="fech_asig">Fecha asignada</label>
            <input 
              type="datetime-local" 
              value={fechAsig} 
              onChange={(e) => setFechAsig(e.target.value)} 
              required 
            />
            <label htmlFor="fech_lim">Fecha límite</label>
            <input 
              type="datetime-local" 
              value={fechLim} 
              onChange={(e) => setFechLim(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              placeholder="Área" 
              value={area} 
              onChange={(e) => setArea(e.target.value)} 
            />
            <select 
              value={idUsuAsignado} 
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
              value={idUsuQueAsigno} 
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
            <button type="submit" className="login-button">Guardar Cambios</button>
          </form>
          <button className="pregunta-cuenta-button" onClick={() => navigate('/actividades')}>Regresar</button>
        </div>
      </main>
    </div>
  );
};

export default EditAct;
