const bcrypt = require('bcrypt');
const knex = require('../../db');

async function createMeasureData({ name, last_name, password, username: email }) {
    const hashedPass = await bcrypt.hash(password, 5);
    const [user] = await knex('users')
        .insert({
            created_at: new Date(),
            email,
            name,
            password: hashedPass,
            last_name,
            update_at: new Date(),
            verified_at: new Date(),
        })
        .returning(['email', 'name']);
    return user;
}

module.exports = {
    createMeasureData,
};