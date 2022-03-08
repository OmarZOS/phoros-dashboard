const debug = require('debug')('express:login');
const passport = require('passport');

const {
    USERNAME_PASSWORD_COMBINATION_ERROR,
    INTERNAL_SERVER_ERROR,
    SUCCESSFULLY_LOGGED_IN,
} = require('../constants');

function login(req, res, next) {
    debug('login');
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
            return res.status(401).redirect('/login');
        }

        return req.logIn(user, loginError => {
            if (loginError) {
                if (req.session) {
                    req.session.messages = {
                        errors: { internalServerError: INTERNAL_SERVER_ERROR },
                    };
                }
                return res.status(500).redirect('/login');
            }
            console.log("successfully logged in")
            if (req.session) {
                req.session.messages = { loggedIn: SUCCESSFULLY_LOGGED_IN };
            }
            return next();
        });
    })(req, res, next);
}

module.exports = login;