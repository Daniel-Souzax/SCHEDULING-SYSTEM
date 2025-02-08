const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    async create({ name, email, password}) {
        const hashPassword = await bcrypt.hash(password, 10);    
        const { rows } = await pool.query(
            'INSERT INTO users (name, email, password) VAlUES ($1, $2, $3) RETURNING *',
            [name, email, hashPassword]
        );
        return rows[0];
    },

    async findAll() {
        const { rows } = await pool.query('SELECT id, name, email FROM users');
        return rows;
    },

    async findByEmail(email) {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]                      
        );
        return rows[0]
    },

    async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]                      
        );
        return rows[0]
    },
};

module.exports = User;