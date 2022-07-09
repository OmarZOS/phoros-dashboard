const debug = require('debug')('express:measureData');
const passport = require('passport');

const {
    INTERNAL_SERVER_ERROR,
    SUCCESSFULLY_LOGGED_IN,
} = require('../constants');

function measureData(req, res, next) {
    debug('measureData');
    return passport.authenticate('local', (error, user) => {
        if (error || !user) {
            console.log("error or not a user")
            console.log(error)
            console.log(!user)
            if (req.session) {
                req.session.messages = {
                    errors: { invalidEmailOrPassword: !user },
                }
            };
            return res.status(401).redirect('/measureData');
        }

        return req.measureData(user, measureDataError => {
            if (measureDataError) {
                if (req.session) {
                    req.session.messages = {
                        errors: { internalServerError: INTERNAL_SERVER_ERROR },
                    };
                }
                return res.status(500).redirect('/measureData');
            }
            console.log("successfully submitted")
            if (req.session) {
                req.session.messages = { submitted: SUCCESSFULLY_LOGGED_IN };
            }
            return next();
        });
    })(req, res, next);
}

module.exports = measureData;