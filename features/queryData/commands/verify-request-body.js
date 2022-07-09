const Joi = require('joi');

const constants = require('../constants');

// const { NAME_MIN, NAME_MAX, PASSWORD_MAX, PASSWORD_MIN } = constants;

const schema = Joi.object().keys({
    Nom_model: Joi.string().required(),
    Nom_puit: Joi.string().required(),
    Pression_pip_d: Joi.number()
        .min(constants.PRESSION_PIP_D_MIN)
        .max(constants.PRESSION_PIP_D_MAX)
        .required(),
    Pression_tete_d: Joi.number()
        .min(constants.PRESSION_TETE_D_MIN)
        .max(constants.PRESSION_TETE_D_MAX)
        .required(),
    Choke: Joi.number()
        .min(constants.CHOKE_MIN)
        .max(constants.CHOKE_MAX)
        .required(),
    Temperature: Joi.number()
        .min(constants.TEMPERATURE_MIN)
        .max(constants.TEMPERATURE_MAX),
    Date_daily_data: Joi.date().max(new Date()).iso(),
});

async function validatequeryDataPayload(req, res, next) {
    let payloadValidation;
    try {
        payloadValidation = await Joi.validate(req.body, schema, { abortEarly: false });
    } catch (validateRegisterError) {
        payloadValidation = validateRegisterError;
    }
    const { details } = payloadValidation;
    let errors;
    if (details) {
        errors = {};
        details.forEach(errorDetail => {
            const {
                path: [key],
                type,
            } = errorDetail;
            const errorType = type.split('.')[1];
            errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`];
        });
    }

    if (errors) {
        req.session.messages = { errors };
        return res.status(400).redirect('/queryData');
    }
    return next();
}

module.exports = validatequeryDataPayload;