// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../routes/users');
const Account = require('../routes/accounts');
const Category = require('../routes/categories');
const Entry = require('../routes/entries');
const adminMiddleware = require('../middleware/middleware'); // Importar o middleware de administração

router.use(adminMiddleware);

router.get('/entries', async (req, res) => {
    try {
        const entries = await Entry.find();
        res.status(200).json(entries);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/getentries', async (req, res) => {
    const entry = req.body;
    try {
        const newEntry = await Entry.create(entry);
        res.status(201).json({ message: 'Entrada salva com sucesso!', newEntry });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/entries/:id', async (req, res) => {
    const id = req.params.id;
    const updatedEntry = req.body;
    try {
        const entry = await Entry.findByIdAndUpdate(id, updatedEntry, { new: true });
        res.json({ message: 'Entrada atualizada com sucesso!', entry });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/entries/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEntry = await Entry.findByIdAndDelete(id);
        res.json({ message: 'Entrada deletada com sucesso!', deletedEntry });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// CRUD de Categorias
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/categories', async (req, res) => {
    const category = req.body;
    try {
        const newCategory = await Category.create(category);
        res.status(201).json({ message: 'Categoria salva com sucesso!', newCategory });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const updatedCategory = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
        res.json({ message: 'Categoria atualizada com sucesso!', category });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/categories/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json({ message: 'Categoria deletada com sucesso!', deletedCategory });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// CRUD de Contas
router.get('/accounts', async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/accounts', async (req, res) => {
    const account = req.body;
    try {
        const newAccount = await Account.create(account);
        res.status(201).json({ message: 'Conta salva com sucesso!', newAccount });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/accounts/:id', async (req, res) => {
    const id = req.params.id;
    const updatedAccount = req.body;
    try {
        const account = await Account.findByIdAndUpdate(id, updatedAccount, { new: true });
        res.json({ message: 'Conta atualizada com sucesso!', account });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/accounts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedAccount = await Account.findByIdAndDelete(id);
        res.json({ message: 'Conta deletada com sucesso!', deletedAccount });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// CRUD de Usuários (com desativação em vez de deleção)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/users', async (req, res) => {
    const userData = req.body.user;
    try {
        const newUser = await User.create(userData);
        res.status(201).json({ message: 'Usuário salvo com sucesso!', newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body.user;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
        res.json({ message: 'Usuário alterado com sucesso!', updatedUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
        res.json({ message: 'Usuário desativado com sucesso!', updatedUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
