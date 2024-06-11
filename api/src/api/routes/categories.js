
// routes/categories.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema({
  description: String,
  type: String
});

const Category = mongoose.model('Category', categoriesSchema);

// Retornar todas as categorias
// GET "/categories"
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Categorias encontradas com sucesso!');
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Inserir uma nova categoria
// POST "/categories" BODY { ... }
router.post('/', async (req, res) => {
  const category = req.body;
  try {
    const newCategory = await Category.create(category);
    console.log('Categoria salva com sucesso!');
    res.json({ message: 'Categoria salva com sucesso!', newCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Alterar uma categoria
// PUT "/categories/:id" BODY { ... }
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedCategory = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
    console.log('Categoria atualizada:', category);
    res.json({ message: 'Categoria atualizada com sucesso!', category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar uma categoria
// DELETE "/categories/:id"
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    console.log('Categoria deletada:', deletedCategory);
    res.json({ message: 'Categoria deletada com sucesso!', deletedCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
