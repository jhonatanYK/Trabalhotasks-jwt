const { DataTypes } = require('sequelize');
const db = require('../db');

const Machine = db.define('Machine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // Trator, Pá Carregadeira, Retroescavadeira, etc.
    allowNull: false,
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  plate: {
    type: DataTypes.STRING, // Placa do veículo
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

module.exports = Machine;
