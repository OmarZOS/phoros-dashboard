const Knex = require('knex');
const bcrypt = require('bcrypt');

const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig.production);


async function getUserForLoginData(email, password) {

    console.log("attempting login");
    const [user] = await knex('USER')
        .select()
        .where({ email })
        .limit(1);

    console.log(user);
    if (!user) {
        return null;
    }

    console.log("found user");

    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);


    if (!isPasswordValid) {
        return null;
    }

    console.log("compared password");

    return {
        id: user.ID_USER,
        username: user.NOM_USER + " " + user.PRENOM_USER,

    };
}

async function getUser(query) {
    console.log(query)
    const [user] = await knex('USER')
        .select()
        .where('ID_USER', query.id)
        .limit(1);
    console.log(user)
    return user;
}

async function getUserById(id) {
    // console.log(id);
    return getUser({ id });
}

module.exports = {
    getUserForLoginData,
    getUserById,
};