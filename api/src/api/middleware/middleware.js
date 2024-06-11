// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

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
    console.log('Token verificado com sucesso', decoded);
    next();
  } catch (err) {
    console.error('Falha na verificação do token:', err.message);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
