// routes/accounts.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const accountsSchema = new mongoose.Schema({
  description: String,
  comments: String
});;

const Account = mongoose.model('Account', accountsSchema);

// Retornar todas as contas
// GET "/accounts"
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    console.log('Contas encontradas com sucesso!');
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Inserir uma nova conta
// POST "/accounts" BODY { ... }
router.post('/', async (req, res) => {
  const account = req.body;
  try {
    const newAccount = await Account.create(account);
    console.log('Conta salva com sucesso!');
    res.json({ message: 'Conta salva com sucesso!', newAccount });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Alterar uma conta
// PUT "/accounts/:id" BODY { ... }
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedAccount = req.body;
  try {
    const account = await Account.findByIdAndUpdate(id, updatedAccount, { new: true });
    console.log('Conta atualizada:', account);
    res.json({ message: 'Conta atualizada com sucesso!', account });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar uma conta
// DELETE "/accounts/:id"
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedAccount = await Account.findByIdAndDelete(id);
    console.log('Conta deletada:', deletedAccount);
    res.json({ message: 'Conta deletada com sucesso!', deletedAccount });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
