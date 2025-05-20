const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    try {
        const user = req.session
        if (user.user) {
            return next();
        }
        res.redirect('/signin?error=Please Start Session');
    } catch (error) {        
        res.redirect('/signin?error=Please Start Session');

    }
}

helpers.isNotAuthenticated = (req, res, next) => {
    try {
        const user = req.session
        if (!user.user) {
            return next();
        }
        return res.redirect('/notes');
    } catch (error) {
        res.redirect('/signin?error=Please Start Session');

    }
}

module.exports = helpers;