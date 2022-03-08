const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const createMeasureData = require('./commands/create-user');
const loadPage = require('./commands/load-page');

module.exports = router => {

    router.get('/measureData', wrap(loadPage));

    router.post('/measureData', wrap(requestBodyValidation), wrap(createMeasureData));

    return router;

};