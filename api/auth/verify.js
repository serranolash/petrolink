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
    return res.status(405).json({ 
      valid: false,
      error: 'Método no permitido' 
    });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ 
        valid: false,
        error: 'Token no proporcionado' 
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      return res.status(500).json({ 
        valid: false,
        error: 'Error de configuración del servidor' 
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Verificar expiración
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({ 
        valid: false,
        error: 'Token expirado' 
      });
    }

    // Verificar que el token tenga los campos requeridos
    if (!decoded.email || !decoded.role) {
      return res.status(401).json({ 
        valid: false,
        error: 'Token inválido' 
      });
    }

    return res.status(200).json({
      valid: true,
      user: {
        email: decoded.email,
        name: decoded.name || 'Administrador',
        role: decoded.role
      },
      expiresAt: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : null
    });

  } catch (error) {
    console.error('Error verificando token:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        valid: false,
        error: 'Token inválido' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        valid: false,
        error: 'Token expirado' 
      });
    }

    return res.status(500).json({ 
      valid: false,
      error: 'Error interno del servidor' 
    });
  }
}