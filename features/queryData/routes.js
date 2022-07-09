const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const submitqueryData = require('./commands/create-daily-data');
const loadPage = require('./commands/load-page');

module.exports = router => {

    router.get('/queryData', wrap(loadPage));

    router.post('/queryData', wrap(requestBodyValidation), wrap(submitqueryData));

    return router;
};