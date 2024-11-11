const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Asegúrate de que la conexión con la base de datos esté configurada

// Inicializa Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Middlewares
app.use(cors());
app.use(express.json());

// Middleware de autenticación (verifica el token JWT)
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  jwt.verify(token, 'petMedic2024', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = user; // Guardar los datos del usuario en la solicitud
    next();
  });
};

// Ruta para registrar nuevos usuarios
// app.post('/api/register', async (req, res) => {
//   const { username, password, role_id } = req.body;
  
//   try {
//     const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
//     if (result.rows.length > 0) {
//       return res.status(400).json({ message: 'El usuario ya existe' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       'INSERT INTO usuarios (username, password, role_id) VALUES ($1, $2, $3) RETURNING *',
//       [username, hashedPassword, role_id]
//     );

//     res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser.rows[0] });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor' });
//   }
// });

// Ruta para el login de usuarios
// Ruta para el login de usuarios
// Ruta para el login de usuarios
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Consultamos si existe el usuario
    const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);

    // Si no encontramos el usuario
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Extraemos el usuario encontrado
    const user = result.rows[0];

    // Comprobamos la contraseña con bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Si todo es correcto, generamos un token JWT
    const token = jwt.sign({ id: user.id, role_id: user.role_id }, 'petMedic2024', { expiresIn: '1h' });

    // Enviamos la respuesta con el token y el username
    res.json({
      message: 'Login exitoso',
      token: token,
      username: user.username, // Asegúrate de incluir el username aquí
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});



// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

