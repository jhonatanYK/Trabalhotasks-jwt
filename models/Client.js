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
  user_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
});

module.exports = Client;
