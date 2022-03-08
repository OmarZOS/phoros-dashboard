const PRESSION_PIP_D_MAX = 3;
const PRESSION_PIP_D_MIN = 0;
const PRESSION_TETE_D_MAX = 3;
const PRESSION_TETE_D_MIN = 0;
const CHOKE_MIN = 0;
const CHOKE_MAX = 1000;
const TEMPERATURE_MIN = 0;
const TEMPERATURE_MAX = 150;
const UP_TIME_MAX = 24;
const UP_TIME_MIN = 0;


const PRESSION_PIP_D_MAX_ERROR = `PRESSION_PIPE value must be at most $${PRESSION_PIP_D_MAX}.`
const PRESSION_PIP_D_MIN_ERROR = `PRESSION_PIPE value must be at least $${PRESSION_PIP_D_MIN}.`
const PRESSION_TETE_D_MAX_ERROR = `PRESSION_TETE_D value must be at most $${PRESSION_TETE_D_MAX}.`
const PRESSION_TETE_D_MIN_ERROR = `PRESSION_TETE_D value must be at least $${PRESSION_TETE_D_MIN}.`
const CHOKE_MIN_ERROR = `CHOKE value must be at least $${CHOKE_MIN}.`
const CHOKE_MAX_ERROR = `CHOKE value must be at most $${CHOKE_MAX}.`
const TEMPERATURE_MIN_ERROR = `TEMPERATURE value must be at least $${TEMPERATURE_MIN}.`
const TEMPERATURE_MAX_ERROR = `TEMPERATURE value must be at most $${TEMPERATURE_MAX}.`
const UP_TIME_MAX_ERROR = `UP_TIME value must be at most $${UP_TIME_MAX}.`
const UP_TIME_MIN_ERROR = `UP_TIME value must be at least $${UP_TIME_MIN}.`
const DATE_DAILY_DATA_ERROR = `The date can be today at most.`

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type serverd by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR

module.exports = {
    PRESSION_PIP_D_MAX,
    PRESSION_PIP_D_MIN,
    PRESSION_TETE_D_MAX,
    PRESSION_TETE_D_MIN,
    CHOKE_MIN,
    CHOKE_MAX,
    TEMPERATURE_MIN,
    TEMPERATURE_MAX,
    UP_TIME_MAX,
    UP_TIME_MIN,
    PRESSION_PIP_D_MAX_ERROR,
    PRESSION_PIP_D_MIN_ERROR,
    PRESSION_TETE_D_MAX_ERROR,
    PRESSION_TETE_D_MIN_ERROR,
    CHOKE_MIN_ERROR,
    CHOKE_MAX_ERROR,
    TEMPERATURE_MIN_ERROR,
    TEMPERATURE_MAX_ERROR,
    UP_TIME_MAX_ERROR,
    UP_TIME_MIN_ERROR,
    DATE_DAILY_DATA_ERROR
};