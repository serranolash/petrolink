export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return res.status(200).json({ 
    status: 'healthy',
    service: 'Petrolink Auth API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    hashConfigured: !!process.env.ADMIN_PASSWORD_HASH,
    jwtConfigured: !!process.env.JWT_SECRET
  });
}