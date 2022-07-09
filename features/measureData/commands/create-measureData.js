const measureDataRepo = require('../repository');

async function createMeasureData(req, res) {
    let user = {};
    const measureDataSuccessMessage = 'You have successfully created measure data, keep it up.';
    try {
        user = await measureDataRepo.createMeasureData(req.body);
    } catch (error) {
        user = error;
    }
    if (user.email) {
        req.session.messages = { success: measureDataSuccessMessage };
        res.redirect('/measureData');
    }
    const { code } = user;
    const databaseError =
        code === '23505' ? 'The value has already been taken.' : 'Something went wrong.';
    req.session.messages = { databaseError };
    res.redirect('/measureData');
}

module.exports = createMeasureData;