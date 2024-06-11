// index.js
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./api/routes');
const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/users');
const accountRoutes = require('./api/routes/accounts');
const categoriesRoutes = require('./api/routes/categories');
const entriesRoutes = require('./api/routes/entries');
const authMiddleware = require('./api/middleware/middleware');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Conexão com o banco de dados
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

// Rotas
app.use('/api', routes);
app.use('/auth', authRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use('/accounts', authMiddleware, accountRoutes);
app.use('/categories', authMiddleware, categoriesRoutes);
app.use('/entries', authMiddleware, entriesRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Aplicação executando na porta ${PORT}!`);
});
