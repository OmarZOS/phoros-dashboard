// const debug = require('debug')('express:queryData');
const passport = require('passport');

const constants = require('../constants');

function queryData(req, res, next) {
    // debug('queryData');
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
            return res.status(401).redirect('/queryData');
        }

        return req.queryData(user, queryDataError => {
            if (queryDataError) {
                if (req.session) {
                    req.session.messages = {
                        errors: { internalServerError: constants.INTERNAL_SERVER_ERROR },
                    };
                }
                return res.status(500).redirect('/queryData');
                // console.log()
            }
            return queryData();
        });
    })(req, res, next);
}

module.exports = queryData;