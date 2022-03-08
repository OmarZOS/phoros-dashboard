const Knex = require('knex');
const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig.production);


async function getUser(id) {

    console.log(id)
    const [user] = await knex('USER')
        .where('ID_USER', id)
        .select('EMAIL', 'NOM_USER');
    return user;
}

async function updateUserInfo({ NOM_USER, EMAIL, ID_USER }) {
    const [user] = await knex(`UPDATE USER SET NOM_USER=${NOM_USER} EMAIL=${EMAIL} WHERE ID_USER=${ID_USER}; `)
        .where({ ID_USER })
        .returning(['EMAIL', 'NOM_USER']);
    return [user.EMAIL, user.NOM_USER];
}

module.exports = {
    getUser,
    updateUserInfo,
};