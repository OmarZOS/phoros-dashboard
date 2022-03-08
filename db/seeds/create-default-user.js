const bcrypt = require('bcrypt');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig.production);


// exports.seed = async function seed(knex) {
const hashedPass = bcrypt.hash('secret', 5);
// Deletes ALL existing entries
d = knex('USER').insert({
    NOM_USER: 'Nobody',
    PRENOM_USER: 'Knows',
    PASSWORD: hashedPass,
    EMAIL: 'nemo@outis.com',
    TYPE: 'Admin'
});

// };