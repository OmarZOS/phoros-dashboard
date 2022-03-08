const { getUser } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPage(req, res) {
    let userInfo;
    const { user } = req;
    // console.log(req)
    try {
        console.log(user)
        userInfo = await getUser(user && user.ID_USER);
    } catch (getUserError) {

        req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
    }

    req.session.userInfo = {...userInfo };
    res.render('pages/profile');
}

module.exports = loadPage;