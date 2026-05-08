require('dotenv').config();

const express = require('express');

const sequelize = require('./config/database');

require('./domain/models/User');
require('./domain/models/Order');

const authRoutes = require('./api/routes/authRoutes');
const protectedRoutes = require('./api/routes/protectedRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const paymentRoutes = require('./api/routes/paymentRoutes');
const { swaggerUi, swaggerDocument } = require('./config/swagger');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/protected', protectedRoutes);

app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  

  return res.json({
    message: 'API Raízes do Nordeste funcionando'
  });

});

sequelize.sync().then(() => {
  console.log('Banco conectado');
});

module.exports = app;