// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/middleware');


// Definir o segredo JWT
const secret = "b88a58a7effe40649cbcd84e5533bb15";

// Importar o modelo de usuário
const User = mongoose.model('User');

// Login route
router.post('/login', async (req, res) => {
  const { user, pwd } = req.body;

  try {
    const foundUser = await User.findOne({ user });
    if (!foundUser) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    const isMatch = await bcrypt.compare(pwd, foundUser.pwd);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas!' });
    }

    console.log('Valor do secret:', secret);
    const token = jwt.sign({ id: foundUser._id, user: foundUser.user, level: foundUser.level }, secret, { expiresIn: '1h' });
    res.json({ message: 'Login efetuado com sucesso', token });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota protegida por autenticação e verificação de administrador
router.get('/admin', authMiddleware, (req, res) => {
  res.json({ message: 'Você é um administrador!' });
});

module.exports = router;