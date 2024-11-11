import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Usamos React Router para redirigir

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Para redirigir al usuario

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Hacemos la solicitud POST al backend
      const response = await axios.post("http://localhost:5000/api/login", {
        username: username,
        password: password,
      });
  
      // Imprimimos la respuesta en consola para verificar que todo está correcto
      console.log("Login exitoso", response.data);
  
      // Guardamos el token y el username en localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username); // Guardamos el username correctamente
  
      // Redirigimos al dashboard
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error de login", error.response ? error.response.data : error.message);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex w-3/4 max-w-4xl">
        
        {/* Sección Izquierda (Logo y Nombre) */}
        <div className="w-1/2 bg-blue-400 text-white flex flex-col items-center justify-center p-8 rounded-l-lg">
          <img src="./img/huella.png" alt="PetMedic Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-3xl font-bold">PetMedic</h1>
          <p className="mt-2 text-center">
            Sistema de gestión veterinaria para administrar pacientes y terapias
          </p>
        </div>
        
        {/* Sección Derecha (Formulario de Login) */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu nombre de usuario"
                className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
