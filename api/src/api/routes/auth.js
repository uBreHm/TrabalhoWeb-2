// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./users');

// Login route
router.post('/login', async (req, res) => {
  const { user, pwd } = req.body;

  try {
    const foundUser = await User.findOne({ user });
    if (!foundUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(pwd, foundUser.pwd);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: foundUser._id, user: foundUser.user, level: foundUser.level }, secret, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
