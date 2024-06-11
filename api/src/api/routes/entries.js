// routes/entries.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const entriesSchema = new mongoose.Schema({
  type: String,
  categories: String,
  description: String,
  value: String,
  due_date: Date,
  payment_date: Date,
  account: String,
  status: String,
  comments: String
});

const Entry = mongoose.model('Entry', entriesSchema);

// Retornar todas as entradas
// GET "/entries"
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    console.log('Entradas encontradas com sucesso!');
    res.status(200).json(entries);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Inserir uma nova entrada
// POST "/entries" BODY { ... }
router.post('/', async (req, res) => {
  const entry = req.body;
  try {
    const newEntry = await Entry.create(entry);
    console.log('Entrada salva com sucesso!');
    res.json({ message: 'Entrada salva com sucesso!', newEntry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Alterar uma entrada
// PUT "/entries/:id" BODY { ... }
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedEntry = req.body;
  try {
    const entry = await Entry.findByIdAndUpdate(id, updatedEntry, { new: true });
    console.log('Entrada atualizada:', entry);
    res.json({ message: 'Entrada atualizada com sucesso!', entry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar uma entrada
// DELETE "/entries/:id"
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedEntry = await Entry.findByIdAndDelete(id);
    console.log('Entrada deletada:', deletedEntry);
    res.json({ message: 'Entrada deletada com sucesso!', deletedEntry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
