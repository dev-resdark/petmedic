import React from 'react';
import Navbar from './NavBar';


const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        {/* Aquí puedes agregar el contenido del Dashboard */}
        <h1>Bienvenido al Dashboard</h1>
      </div>
    </div>
    
  );
};

export default Dashboard;
