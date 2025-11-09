const db = require('../db');
const User = require('./User');
const Client = require('./Client');
const Machine = require('./Machine');

const Task = db.define('task', {
  serviceName: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  startTime: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  endTime: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  hoursWorked: {
    type: db.Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  totalAmount: {
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
Task.belongsTo(Machine, { foreignKey: 'machine_id', as: 'machine' });

module.exports = Task;
