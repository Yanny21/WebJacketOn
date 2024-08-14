import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AsignaAct from './components/asignaAct';
import EditAct from './components/editAct';
import Editar from './components/editar';
import EditEmp from './components/editEmp';
import GestAct from './components/gestAct';
import GestEmp from './components/gestEmp';
import GestSup from './components/gestSup';
import Graficasyrep from './components/graficasyreportes';
import Login from './components/Login';
import Metricas from './components/metricas';
import Registro from './components/registro';
import RegistroAct from './components/registroAct';
import RegistroEmp from './components/registroEmp';

const AppRouter = () => (
  <Router>
    <Routes>
    <Route path="/graficasyrep" element={<Graficasyrep />} />
      <Route path="/supervisores" element={<GestSup />} />
      <Route path="/empleados" element={<GestEmp />} />
      <Route path="/actividades" element={<GestAct />} />
      <Route path="/metricas" element={<Metricas />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/registroAct" element={<RegistroAct />} />
      <Route path="/registroEmp" element={<RegistroEmp />} />
      <Route path="/editar/:id" element={<Editar />} /> {/* Ruta con parámetro :id */}
      <Route path="/asignaAct" element={<AsignaAct />} />
      <Route path="/editEmp/:id" element={<EditEmp />} /> {/* ARROBAFER TRAES DESDE AQUI EL ID, ES UNA RUTA CON PARAMETRO ID */}
      <Route path="/editAct/:id" element={<EditAct />} />
      <Route exact path="/" element={<Login />} /> {/* Ruta por defecto */}
    </Routes>
  </Router>
);

export default AppRouter;