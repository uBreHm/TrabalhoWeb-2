const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const usersSchema = new mongoose.Schema({
  name: String, 
  email: { type: String, unique: true },
  user: { type: String, unique: true },
  pwd: String, 
  level: String, 
  status: String, 
  create_date: { type: Date, default: Date.now }
});

usersSchema.pre('save', async function(next) {
  if (this.isModified('pwd') || this.isNew) {
    this.pwd = await bcrypt.hash(this.pwd, 10);
  }
  next();
});

const User = mongoose.model('User', usersSchema);

router.get('/', async (req, res) => {
  try {
    const foundedUser = await User.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const foundedUser = await User.findById(id);
    if (!foundedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    console.log('Objeto encontrado com sucesso!');
    res.json({ message: 'Usuário encontrado com sucesso!', foundedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const userData = req.body;
  try {

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'O email já está em uso.' });
    }
    const newUser = new User(userData);
    await newUser.save();
    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Usuário salvo com sucesso!', newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;

  try {

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    existingUser.name = updatedUserData.name;
    existingUser.email = updatedUserData.email;
    existingUser.user = updatedUserData.user;
    if (updatedUserData.pwd) {
      existingUser.pwd = await bcrypt.hash(updatedUserData.pwd, 10); // Hash a nova senha
    }
    existingUser.level = updatedUserData.level;
    existingUser.status = updatedUserData.status;

    const updatedUser = await existingUser.save();
    console.log('Objeto Atualizado:', updatedUser);
    res.json({ message: 'Usuário alterado com sucesso!', updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    console.log('Objeto deletado:', deletedUser);
    res.json({ message: 'Usuário deletado com sucesso!', deletedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
