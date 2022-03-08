const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const createUser = require('./commands/create-measureData');
const loadPage = require('./commands/load-page');

module.exports = router => {

    router.get('/measureData', wrap(loadPage));

    router.post('/measureData', wrap(requestBodyValidation), wrap(createUser));

    return router;

};