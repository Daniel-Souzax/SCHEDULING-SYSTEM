const Service = require('../models/Service');
const { login } = require('./authController');

const serviceController = {
    async create(req, res) {
        const {name, duration } = req.body;
        const user_id = req.user.id;
        try {
            const service = await Service.create({ name, duration, user_id });

            res.status(201).json(service);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar serviço', error })
        }
    },

    async findAll(req, res) {
        const user_id = req.user.id;

        try{
            const services = await Service.findALL(user_id);
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar serviços', error });
        }
    },

    async findById(req, res) {
        const { id } = req.params;
        try {
            const service = await Service.findById(id);
            if(!service) return res.status(400).json({ message: 'Serviço não encontrado' });

            res.json(service);
        } catch (error) {
            res.status(500).json({message: 'Erro ao buscar serviço', error});
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, duration } = req.body;
        try {
            const service = await Service.update(id, { name, duration });
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar serviço', error });
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        try{
            await Service.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar serviço', error });
        }
    },
};

module.exports = serviceController;