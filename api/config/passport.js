const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.js');
const { validateUserSignIn } = require('../repository/UserRepository.js');

passport.use(new LocalStrategy({
    usernameField: 'email',
},
    async (email, password, done) => {
        try {

            const verify = validateUserSignIn({ email, password });
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errors= message.map(err => err.message);
                done(null, false, errors);
            }

            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'Not user found' });
            }
            else {
                const match = await user.mathPassword(password);
                if (match) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'Incorrect Password' });
                }
            }
        } catch (error) {
            return done(error)
        }
    }));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
});