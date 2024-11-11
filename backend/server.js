const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Asegúrate de que la conexión con la base de datos esté configurada


// Middleware de autenticación (verifica el token JWT)
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  jwt.verify(token, 'tu_clave_secreta', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = user; // Guardar los datos del usuario en la solicitud
    next();
  });
};


// Ruta para registrar nuevos usuarios
app.post('/api/register', async (req, res) => {
  const { username, password, role_id } = req.body;
  
  try {
    // Verificar si el usuario ya existe
    const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    const newUser = await pool.query(
      'INSERT INTO usuarios (username, password, role_id) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role_id]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
// Ruta para el login de usuarios
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = result.rows[0];

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: user.id, role_id: user.role_id }, 'tu_clave_secreta', { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
