// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://leonardobrehm:leonardo@cluster0.ycyep9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

module.exports = mongoose.connection;
