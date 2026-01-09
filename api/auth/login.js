import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email y contraseña son requeridos' 
      });
    }

    // Solo permitir email específico
    if (email !== 'admin@petrolinkvzla.com') {
      console.warn(`Intento de login con email no autorizado: ${email}`);
      return res.status(401).json({ 
        success: false,
        error: 'Credenciales inválidas' 
      });
    }

    // Verificar contraseña con bcrypt
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
    
    if (!ADMIN_PASSWORD_HASH) {
      console.error('ADMIN_PASSWORD_HASH no configurada en variables de entorno');
      return res.status(500).json({ 
        success: false,
        error: 'Error de configuración del servidor' 
      });
    }

    // Comparar contraseña con hash usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isPasswordValid) {
      console.warn(`Intento fallido de login para: ${email} desde IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
      
      // Pequeño delay para prevenir brute force
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return res.status(401).json({ 
        success: false,
        error: 'Credenciales inválidas' 
      });
    }

    // Crear token JWT
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      console.error('JWT_SECRET no configurada en variables de entorno');
      return res.status(500).json({ 
        success: false,
        error: 'Error de configuración del servidor' 
      });
    }

    const token = jwt.sign(
      {
        email: email,
        name: 'Administrador Petrolink',
        role: 'admin',
        timestamp: Date.now(),
        exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60) // 8 horas
      },
      JWT_SECRET,
      { algorithm: 'HS256' }
    );

    console.log(`Login exitoso para: ${email}`);

    return res.status(200).json({
      success: true,
      token,
      user: {
        email: email,
        name: 'Administrador Petrolink',
        role: 'admin'
      },
      expiresIn: '8h'
    });

  } catch (error) {
    console.error('Error en login:', error);
    
    return res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}