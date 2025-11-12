const db = require('../db');

// Tabela intermediária para relacionamento de múltiplas máquinas por serviço
const TaskMachine = db.define('task_machine', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  task_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'id'
    }
  },
  machine_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Machines',
      key: 'id'
    }
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
    defaultValue: 0
  },
  totalAmount: {
    type: db.Sequelize.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  hourlyRate: {
    type: db.Sequelize.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'task_machines',
  timestamps: true
});

module.exports = TaskMachine;
