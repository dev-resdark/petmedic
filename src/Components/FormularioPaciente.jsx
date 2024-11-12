import React, { useState, useEffect } from 'react';

const FormularioPaciente = ({ onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [dueño, setDueño] = useState('');
  const [celular, setCelular] = useState('');
  const [razasDisponibles, setRazasDisponibles] = useState([]);

  const especies = [
    { id: 1, nombre: 'Perro' },
    { id: 2, nombre: 'Gato' },
    { id: 3, nombre: 'Conejo' },
    { id: 4, nombre: 'Hámster' },
    { id: 5, nombre: 'Pájaro' },
  ];

  const razasPorEspecie = {
    1: ['Mestizo', 'Labrador Retriever', 'Bulldog', 'Pastor Aleman', 'Golden Retriever', 'Beagle', 'Poodle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund', 'Boxer', 'Chihuahua', 'Shih Tzu', 'Pug', 'Border Collie', 'Doberman', 'Pastor Australiano', 'Jack Russell Terrier', 'Schnauzer', 'Cocker Spaniel', 'Akita'],
    2: ['Mestizo', 'Siamés', 'Persa', 'Maine Coon', 'Bengalí', 'Sphynx', 'British Shorthair', 'Ragdoll', 'Birmano', 'Chartreux', 'American Shorthair', 'Scottish Fold', 'Abisinio', 'Exótico', 'Oriental', 'Bosque de Noruega', 'Siberiano', 'Tonquinés', 'Burmés', 'Cornish Rex', 'Devon Rex'],
    3: ['Mestizo', 'Holland Lop', 'Mini Rex', 'Lionhead', 'Netherland Dwarf', 'Flemish Giant', 'English Angora', 'French Lop', 'American Fuzzy Lop', 'Himalayan', 'Mini Lop', 'Rex', 'American Chinchilla', 'Californiano', 'Neozelandés', 'Holandés', 'Cabeza de León', 'Satin', 'Palomino', 'Británico Gigante', 'English Spot'],
    4: ['Mestizo', 'Sirio', 'Enano Ruso', 'Roborovski', 'Chino', 'Campbell', 'Winter White', 'Hámster de Angora', 'Hámster Albino', 'Ruso de Cola Larga', ],
    5: ['Canario', 'Periquito', 'Loro'],
  };

  useEffect(() => {
    if (especie) {
      setRazasDisponibles(razasPorEspecie[especie] || []);
      setRaza('');
    }
  }, [especie]);

  const handleSave = () => {
    const nuevoPaciente = { nombre, especie, raza, dueño, celular };
    if (onSave) onSave(nuevoPaciente);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Añadir Paciente</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre del Paciente</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa el nombre del paciente"
                className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700">Especie</label>
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Selecciona la especie</option>
                {especies.map((esp) => (
                  <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Raza</label>
              <select
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Selecciona la raza</option>
                {razasDisponibles.map((raza, index) => (
                  <option key={index} value={raza}>{raza}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Dueño (Nombre y Apellido)</label>
              <input
                type="text"
                value={dueño}
                onChange={(e) => setDueño(e.target.value)}
                placeholder="Ingresa el nombre y apellido del dueño"
                className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700">Celular</label>
              <input
                type="text"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="Número de contacto"
                className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPaciente;









