const Task = require('../models/Task');
const User = require('../models/User');
const Client = require('../models/Client');
const Machine = require('../models/Machine');


// Renderiza lista de serviços
const renderList = async (req, res) => {
  try {
    const tasks = await Task.findAll({ 
      where: { user_id: req.user.id },
      include: [
        { model: Client, as: 'client' },
        { model: Machine, as: 'machine' }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.render('tasks/listar', { tasks });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar serviços' });
  }
};

// Renderiza formulário de novo serviço
const renderNew = async (req, res) => {
  try {
    const clients = await Client.findAll({ order: [['name', 'ASC']] });
    const machines = await Machine.findAll({ order: [['name', 'ASC']] });
    res.render('tasks/nova', { clients, machines });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao carregar formulário' });
  }
};

// Cria novo serviço
const create = async (req, res) => {
  try {
    const { client_id, machine_id, serviceName, startTime, endTime, hoursWorked, totalAmount, location, description } = req.body;
    await Task.create({ 
      client_id, 
      machine_id,
      serviceName, 
      startTime,
      endTime,
      hoursWorked,
      totalAmount,
      location, 
      description, 
      user_id: req.user.id 
    });
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send({ error: 'Erro ao criar serviço' });
  }
};

// Renderiza formulário de edição
const renderEdit = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      where: { id: req.params.id, user_id: req.user.id },
      include: [
        { model: Client, as: 'client' },
        { model: Machine, as: 'machine' }
      ]
    });
    if (!task) return res.status(404).send('Serviço não encontrado');
    
    const clients = await Client.findAll({ order: [['name', 'ASC']] });
    const machines = await Machine.findAll({ order: [['name', 'ASC']] });
    res.render('tasks/editar', { task, clients, machines });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar serviço' });
  }
};

// Edita serviço
const edit = async (req, res) => {
  try {
    const { client_id, machine_id, serviceName, startTime, endTime, hoursWorked, totalAmount, location, description } = req.body;
    await Task.update(
      { client_id, machine_id, serviceName, startTime, endTime, hoursWorked, totalAmount, location, description }, 
      { where: { id: req.params.id, user_id: req.user.id } }
    );
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send({ error: 'Erro ao editar serviço' });
  }
};

// Completa serviço
const complete = async (req, res) => {
  try {
    await Task.update({ completed: true }, { where: { id: req.params.id, user_id: req.user.id } });
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send({ error: 'Erro ao completar serviço' });
  }
};

// Exclui serviço
const remove = async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send({ error: 'Erro ao excluir serviço' });
  }
};

module.exports = {
  renderList,
  renderNew,
  create,
  renderEdit,
  edit,
  complete,
  remove,
};
