const db = require('../db');
const User = require('./User');
const Client = require('./Client');

const Task = db.define('task', {
  serviceName: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  hourlyRate: {
    type: db.Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  location: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: db.Sequelize.TEXT,
    allowNull: true,
  },
  completed: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Task.belongsTo(User, { foreignKey: 'user_id' });
Task.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });

module.exports = Task;
