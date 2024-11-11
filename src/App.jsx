import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddPatient from './Components/AddPatient'; // El componente donde agregarás pacientes
import AddUser from './Components/AddUser'; // El componente donde agregarás usuarios

const App = () => {
  return (
    <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>

        

  );
};
export default App;
