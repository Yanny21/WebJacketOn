import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AsignaAct from './components/asignaAct';
import Editar from './components/editar';
import GestAct from './components/gestAct';
import GestEmp from './components/gestEmp';
import GestSup from './components/gestSup';
import Login from './components/Login';
import Metricas from './components/metricas';
import Registro from './components/registro';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/supervisores" element={<GestSup />} />
      <Route path="/empleados" element={<GestEmp />} />
      <Route path="/actividades" element={<GestAct />} />
      <Route path="/metricas" element={<Metricas />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/editar/:id" element={<Editar />} /> {/* Ruta con parámetro :id */}
      <Route path="/asignaAct" element={<AsignaAct />} />
      <Route exact path="/" element={<Login />} /> {/* Ruta por defecto */}
    </Routes>
  </Router>
);

export default AppRouter;
