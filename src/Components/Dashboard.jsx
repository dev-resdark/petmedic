import React, { useState } from 'react';
import Navbar from './NavBar';
import FormularioPaciente from './FormularioPaciente';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddPatientClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div>
      <Navbar onAddPatientClick={handleAddPatientClick} />
      <div className="p-4">
        <h1>Bienvenido al Dashboard</h1>
      </div>
      {showForm && <FormularioPaciente onClose={handleCloseForm} />}
    </div>
  );
};

export default Dashboard;
