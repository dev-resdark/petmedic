const bcrypt = require('bcrypt');

// Cambia esta variable por la contraseña que quieres cifrar
const password = 'petMedic2024';

// Genera la contraseña cifrada
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
    return;
  }
  console.log('Contraseña cifrada:', hash);
});
