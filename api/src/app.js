const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./api/routes');
const authMiddleware = require('./api/middleware/middleware');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

app.use('/api', routes);
app.use('/auth', require('./api/routes/auth'));

app.use('/users', authMiddleware, require('./api/routes/users'));
app.use('/accounts', authMiddleware, require('./api/routes/accounts'));
app.use('/categories', authMiddleware, require('./api/routes/categories'));
app.use('/entries', authMiddleware, require('./api/routes/entries'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Aplicação executando na porta ${PORT}!`);
});
