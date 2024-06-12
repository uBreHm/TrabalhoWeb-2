// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const secret = "b88a58a7effe40649cbcd84e5533bb15";

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Cabeçalho de autorização ausente' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    // Verificar se o usuário tem permissão de administrador
    if (req.user.level !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão de administrador.' });
    }

    console.log('Token verificado com sucesso', decoded);
    next();
  } catch (err) {
    console.error('Falha na verificação do token:', err.message);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
