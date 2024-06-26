
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

router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    console.log('Entradas encontradas com sucesso!');
    res.status(200).json(entries);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const foundEntry = await Entry.findById(id);

    if (!foundEntry) {
      return res.status(404).json({ message: 'Entrada não encontrada' });
    }
    console.log('Entradas encontradas com sucesso!');
    res.status(200).json(foundEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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
