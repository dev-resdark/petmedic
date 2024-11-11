import React from 'react';
import { Link } from 'react-router-dom'; // Para redirigir a otras páginas

const Navbar = () => {
    const username = localStorage.getItem("username") || "Usuario";


  return (
    <nav className="flex items-center justify-between bg-blue-600 p-4 text-white shadow-lg">
        <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">PetMedic</span>
        </div>
        <div className="flex items-center space-x-6">
            <span className="text-lg">Bienvenido, {username}</span>
            <Link to="/add-patient">
            <button className="bg-green-600 p-3 rounded-full text-white hover:bg-green-700">
                <span className="text-xl">+</span> Nuevo Paciente
            </button>
            </Link>
            <Link to="/add-user">
            <button className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700">
                <span className="text-xl">+</span> Nuevo Usuario
            </button>
            </Link>
        </div>
    </nav>

  );
};

export default Navbar;
