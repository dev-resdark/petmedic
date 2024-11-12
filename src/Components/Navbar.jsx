import React from 'react';

const Navbar = ({ onAddPatientClick }) => {
  const username = localStorage.getItem("username") || "Usuario";

  return (
    <nav className="flex items-center justify-between bg-blue-400 p-4 text-white shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">PetMedic</span>
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-lg">Bienvenido, {username}</span>
        <button onClick={onAddPatientClick} className="bg-green-600 p-3 rounded-full text-white hover:bg-green-700">
          Nuevo Paciente
        </button>
        <button className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700">
          Nuevo Usuario
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
