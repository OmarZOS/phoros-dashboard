const registerRepo = require('../repository');

async function createqueryData(req, res) {
    let user = {};
    const registerSuccessMessage = 'Data successfully submitted, keep up the good job.';
    try {
        user = await registerRepo.createUser(req.body);
    } catch (error) {
        user = error;
    }
    if (user.email) {
        req.session.messages = { success: registerSuccessMessage };
        res.redirect('/queryData');
    }
    const { code } = user;
    const databaseError =
        code === '23505' ? 'The data has already been submitted.' : 'Something went wrong.';
    req.session.messages = { databaseError };
    res.redirect('/queryData');
}

module.exports = createqueryData;