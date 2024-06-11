// routes/users.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
  id: String, 
  name: String, 
  email: String, 
  user: String, 
  pwd: String, 
  level: String, 
  status: String, 
  create_date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', usersSchema);

// Retornar todos os usuários
// GET "/users"
router.get('/', async (req, res) => {
  try {
    const foundedUser = await User.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retornar um usuário específico
// GET /users/:id
router.get('/:id', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedUser = await User.findById( pid );
    console.log('Objeto encontrado com sucesso!');
    res.json({ message: 'Usuário encontrado com sucesso!', foundedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Inserir um novo usuário
// POST "/users" BODY { ... }
router.post('/', async (req, res) => {
  const userData = req.body.user;
  
  try {
    // Verificar se já existe um usuário com o mesmo email
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'O email já está em uso.' });
    }
    
    // Se não houver usuário com o mesmo email, crie o novo usuário
    const newUser = await User.create(userData);
    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Usuário salvo com sucesso!', newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Alterar um usuário
// PUT "/users/:id" BODY { ... }
router.put('/:id', async (req, res) => {
  const pid = req.params.pid;
  const updatedUserData = req.body.user; // Obtenha os dados atualizados do usuário do corpo da solicitação
  
  try {
    // Verifique se o usuário que está sendo atualizado existe
    const existingUser = await User.findById(pid);
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualize os campos do usuário com os dados fornecidos
    existingUser.name = updatedUserData.name;
    existingUser.email = updatedUserData.email;
    existingUser.user = updatedUserData.user;
    existingUser.pwd = updatedUserData.pwd;
    existingUser.level = updatedUserData.level;
    existingUser.status = updatedUserData.status;

    // Salve as alterações no banco de dados
    const updatedUser = await existingUser.save();
    console.log('Objeto Atualizado:', updatedUser);
    res.json({ message: 'Usuário alterado com sucesso!', updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Deletar um usuário
// DELETE "/users/:id"
router.delete('/:id', async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedUser = await User.findByIdAndDelete(pid);
    console.log('Objeto deletado:', deletedUser);
    res.json({ message: 'Usuário deletado com sucesso!', deletedUser });
    //res.json(deletedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
