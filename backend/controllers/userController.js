const User = require('../models/User');

const userController = {
  async findAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
        console.error(error);
        
      res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
  },
};

module.exports = userController;