const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const User = require('../models/User');
const sendEmail = require('../config/email');

const appointmentController = {
    async create(req, res) {
        const { service_id, date_time } = req.body;
        const user_id = req.user.id

        try {
            const service = await Service.findById(service_id);
            if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });

            const existingAppointment = await Appointment.findByDateTime({date_time, user_id});
          
            if (existingAppointment) return res.status(400).json({ message: 'Horário já ocupado' });

            const appointment = await Appointment.create({
                user_id,
                service_id,
                date_time,
                duration: service.duration,
            });

            const user = await User.findById(user_id);

            const emailSubject = 'Confirmação de Agendamento';
            const emailText = `Olá ${user.name}, \n\nSeu agendamento para o serviço "${service.name}"
             foi confirmado para o dia e hora: ${new Date(date_time).toLocaleString()}.\n\n
             Atenciosamente,\nEquipe de Agendamento.`;
            
            await sendEmail(user.email, emailSubject, emailText);

            res.status(201).json(appointment);
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Erro ao criar agendamento', error });
        }
    },

    async findAllByUser(req, res) {
        const user_id = req.user.id;
        try {
            const appointment = await Appointment.findAllByUser(user_id);
            res.json(appointment)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar agendamentos', error });
        }
    },
};

module.exports = appointmentController;