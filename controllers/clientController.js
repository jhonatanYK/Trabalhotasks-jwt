const Client = require('../models/Client');

const renderList = async (req, res) => {
  try {
    const clients = await Client.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.render('clients/listar', { clients });
  } catch (error) {
    res.status(500).send('Erro ao listar clientes');
  }
};

const renderNew = (req, res) => {
  res.render('clients/nova');
};

const createClient = async (req, res) => {
  try {
    const { name, email, phone, address, notes } = req.body;
    await Client.create({ name, email, phone, address, notes });
    res.redirect('/clients');
  } catch (error) {
    res.status(500).send('Erro ao criar cliente');
  }
};

const renderEdit = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).send('Cliente não encontrado');
    }
    res.render('clients/editar', { client });
  } catch (error) {
    res.status(500).send('Erro ao carregar cliente');
  }
};

const updateClient = async (req, res) => {
  try {
    const { name, email, phone, address, notes } = req.body;
    await Client.update(
      { name, email, phone, address, notes },
      { where: { id: req.params.id } }
    );
    res.redirect('/clients');
  } catch (error) {
    res.status(500).send('Erro ao atualizar cliente');
  }
};

const deleteClient = async (req, res) => {
  try {
    await Client.destroy({ where: { id: req.params.id } });
    res.redirect('/clients');
  } catch (error) {
    res.status(500).send('Erro ao deletar cliente');
  }
};

module.exports = {
  renderList,
  renderNew,
  createClient,
  renderEdit,
  updateClient,
  deleteClient,
};
