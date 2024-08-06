import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formularios.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/supervisores');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nom_usu', nombre);
    formData.append('app_usu', apellido);
    formData.append('email_usu', email);
    formData.append('pass_usu', password);

    fetch('http://localhost:8080/webJacketOn/server/registerSupervisor.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigate('/supervisores');
      } else {
        alert('Error registrando supervisor: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  };

  return (
    <div className="login-container">
      <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Registro de supervisores</h2>
          <p>Ingrese todos los datos</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <input type="email" placeholder="email@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="login-button">Registrar</button>
          </form>
          <button className="pregunta-cuenta-button" onClick={handleRegresar}>Regresar</button>
        </div>
      </main>
    </div>
  );
};

export default Registro;
