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

    if(foundUser.status === 'off'){
      return res.status(403).json({ message: 'Usuário desativado!' });
    }
    
    const token = jwt.sign({ id: foundUser._id, user: foundUser.user, level: foundUser.level, status: foundUser.status }, secret, { expiresIn: '1h' });
    res.json({ message: 'Login efetuado com sucesso', token });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/admin', authMiddleware, (req, res) => {
  res.json({ isAdmin: true });
});

module.exports = router;
