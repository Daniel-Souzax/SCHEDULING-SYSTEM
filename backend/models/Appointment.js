const pool = require('../config/db');

const Appointment = {
    async create({ user_id, service_id, date_time, duration }) {
        const { rows } = await pool.query(
            'INSERT INTO appointments (user_id, service_id, date_time, duration) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, service_id, date_time, duration]
        );
        return rows[0]
    },

    async findByDateTime({date_time, user_id}) {
        const { rows } = await pool.query('SELECT * FROM appointments WHERE date_time = $1 AND user_id = $2', [date_time, user_id]);
        return rows[0];        
    },

    async findAllByUser(user_id) {
        const { rows } = await pool.query('SELECT * FROM appointments WHERE user_id = $1', [user_id]);
        return rows;
    },

}

module.exports = Appointment;