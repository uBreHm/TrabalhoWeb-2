const express = require('express');
const router = express.Router();
const users = require('./users');
const accounts = require('./accounts');
const categories = require('./categories');
const entries = require('./entries');
const auth = require('./auth');

router.use(express.json());
router.use('/users', users);
router.use('/accounts', accounts);
router.use('/categories', categories);
router.use('/entries', entries);
router.use('/auth', auth); 

module.exports = router;
