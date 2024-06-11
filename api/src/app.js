// index.js
const express = require('express');
const app = express();
const routes = require('./api/routes');
const db = require('./db');

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/api', routes);

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', function() {
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

app.listen(8080, function() {
    console.log('Aplicação executando na porta 8080!');
});
