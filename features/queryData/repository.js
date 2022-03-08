const knex = require('../../db/index');

async function createqueryData({ ID_PUIT, Date_daily_data, Temperature, Choke, Pression_pip_d, Pression_tete_d, Nom_Model, }) {
    const [dateien] = await knex.query({
                table: "DAILY_DATA",
                ID_MODEL: (2, 1)[Nom_Model == "Gilbert"],
                ID_PUIT: ID_PUIT,
                ID_USER: locals.userInfo.id,
                PRESSION_PIP_D: Pression_pip_d,
                PRESSION_TETE_D: Pression_tete_d,
                DIAMETRE: Choke,
                TEMPERATURE: Temperature,
                DATE_DAILY_DATA: Date_daily_data,
                DATE_INSERTION: new Date(),
            }

        )
        .returning(['ID_DAILY_DATA', 'PRESSION_PIP_D', 'PRESSION_TETE_D', 'CHOKE']);
    return dateien;
}

module.exports = {
    createqueryData,
};