const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./api/routes');
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

// Defina o segredo JWT diretamente aqui
const secret = "b88a58a7effe40649cbcd84e5533bb15";


// Rotas
app.use('/api', routes);
app.use('/auth', require('./api/routes/auth')); // Certifique-se de que está usando a rota correta

// Rotas protegidas
app.use('/users', authMiddleware, require('./api/routes/users'));
app.use('/accounts', authMiddleware, require('./api/routes/accounts'));
app.use('/categories', authMiddleware, require('./api/routes/categories'));
app.use('/entries', authMiddleware, require('./api/routes/entries'));

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
