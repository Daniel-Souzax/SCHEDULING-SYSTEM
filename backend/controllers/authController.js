const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const authController = {
    async register(req, res) {
        const {name, email, password } = req.body
        
        try{
            const userExists = await User.findByEmail(email);
            if(userExists) return res.status(400).json({ message: 'Email já cadastrado'});

            const user = await User.create({ name, email, password });
            res.status(201).json(user)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar usuário', error });
        }
    },

    async login(req, res) {
        const {email, password } = req.body;   

        try{
            const user = await User.findByEmail(email);
            if(!user) return res.status(400).json({ message: 'Usuário não encontrado' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
              return res.status(400).json({ message: 'Senha incorreta' });
            }
            
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {;
            console.error(error);
            res.status(500).json({ message: 'Erro ao fazer login', error })
        }
    },
};

module.exports = authController;
