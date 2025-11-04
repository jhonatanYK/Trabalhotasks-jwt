const db = require('../db');

const Client = db.define('client', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  notes: {
    type: db.Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Client;
