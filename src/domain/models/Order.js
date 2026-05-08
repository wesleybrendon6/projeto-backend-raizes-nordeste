const { DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const Order = sequelize.define('Order', {

  product: {
    type: DataTypes.STRING,
    allowNull: false
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  canalPedido: {
    type: DataTypes.ENUM('APP', 'TOTEM', 'BALCAO', 'WEB', 'PICKUP'),
    allowNull: false
  },

  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDENTE'
  }

});

module.exports = Order;