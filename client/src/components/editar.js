import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './formularios.css';

const Editar = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/webJacketOn/server/getSupervisor.php?id_usu=${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setNombre(data.nom_usu);
          setApellido(data.app_usu);
          setEmail(data.email_usu);
          setPassword(data.pass_usu); // Assuming the password is stored hashed and sent as it is
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  const handleRegresar = () => {
    navigate('/supervisores');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id_usu', id);
    formData.append('nom_usu', nombre);
    formData.append('app_usu', apellido);
    formData.append('email_usu', email);
    formData.append('pass_usu', password);

    fetch('http://localhost:8080/webJacketOn/server/updateSupervisor.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigate('/supervisores');
      } else {
        alert('Error actualizando supervisor: ' + data.error);
      }
    });
  };

  return (
    <div className="login-container">
      <header className="registro-header">
        <h1>Jacket - On</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>Editar cuenta</h2>
          <p>Edite los datos que desea editar</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <input type="email" placeholder="email@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="login-button">Guardar cambios</button>
          </form>
          <button className="pregunta-cuenta-button" onClick={handleRegresar}>Volver</button>
        </div>
      </main>
    </div>
  );
};

export default Editar;
