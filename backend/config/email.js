const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: `"Agendamento" <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            text,
        });
        console.log('E-mail enviado: ', info.messageId);
        
    } catch (error) {
        console.error('Erro ao enviar e-mail: ', error); 
    }
};

module.exports = sendEmail;