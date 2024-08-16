import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dash.css';

const Sidebar = (props) => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Jacket - On</h2>
        <nav>
          <ul>
            <li className={` ${location.pathname === '/supervisores' ? 'active current' : ''}`}>
              <Link to="/supervisores">GESTION DE SUPERVISORES</Link>
            </li>
            <li className={` ${location.pathname === '/empleados' ? 'active current' : ''}`}>
              <Link to="/empleados">GESTION DE EMPLEADOS</Link>
            </li>
            <li className={` ${location.pathname === '/actividades' ? 'active current' : ''}`}>
              <Link to="/actividades">GESTION DE ACTIVIDADES</Link>
            </li>
            <li className={` ${location.pathname === '/graficasyrep' ? 'active current' : ''}`}>
              <Link to="/graficasyrep">GRAFICAS Y REPORTES</Link>
            </li>
            <li className={` ${location.pathname === '/metricas' ? 'active current' : ''}`}>
              <Link to="/metricas">METRICAS</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h3>¡Hola! Te damos la bienvenida a tu panel de control</h3>
          <div className="header-right">
            <div className="search-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F2E527" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
              <input type="text" placeholder="Buscar..." />
            </div>
            <div className={`user-icon-container ${dropdownOpen ? 'show' : ''}`} onClick={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#F2E527" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
              </svg>
              <div className="dropdown-menu">
                <button onClick={() => console.log('Editar perfil')}>Editar perfil</button>
                <button onClick={() => console.log('Cerrar sesión')}>Cerrar sesión</button>
              </div>
            </div>
          </div>
        </header>
        {props.children}
      </main>
    </div>
  );
};

export default Sidebar;