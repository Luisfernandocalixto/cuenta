const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const passport = require('passport');
const path = require('path');
const { isAuthenticated } = require('../helpers/auth.js');

router.get('/signin', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../client/signin.html'))

    } catch (error) {
        console.log('Error');

    }
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/signin?error=La%20Authenticación%20Falló',
    failureFlash: true,

}));

router.get('/api/user', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.json({ name: req.user.name })
        }
        else {
            res.status(401).json({ error: 'No autorizado, No ha iniciado sesión con su cuenta' });
        }
    } catch (error) {
        console.log('Error');
    }

});

// redireccionar directamente a signin 
// router.get('/notes', isAuthenticated, async (req, res) => {  
router.get('/notes', async (req, res) => {
    try {

        res.sendFile(path.join(__dirname, '../../client/notes.html'))
    } catch (error) {
        console.log('Error');

    }
});

router.get('/signup', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../client/signup.html'));

    } catch (error) {
        console.log('Error');

    }

});


router.post('/signup', async (req, res) => {
    try {

        const { name, email, password, confirm_password } = req.body;
        const errors = []

        if (name.length <= 0) {
            errors.push({ text: 'Please Insert Your Name' })
        }

        if (password != confirm_password) {
            errors.push({ text: 'Password do not match' })
        }

        if (password.length < 4) {
            errors.push({ text: 'Password must be at least 4 characters' });
        }

        if (errors.length > 0) {
            // forma de redireccionar con sendFile
            // res.sendFile(path.join(__dirname, '../../client/signup.html'));
            // forma de redirect 
            // res.redirect(301, 'https://google.com');
            res.redirect('/signup?error=Credenciales%20Incorrectas');

        }

        else {
            const emailUser = await User.findOne({ email: email });
            if (emailUser) {
                res.redirect("/signup?error=El%20correo%20ya%20existe");
                // res.sendFile(path.join(__dirname, '../../client/signup.html'));
                // res.status(400).sendFile(path.join(__dirname, '../../client/signup.html'));

            }

            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            // res.sendFile(path.join(__dirname, '../../client/signin.html'));
            res.redirect("/signin?success=Ingrese%20con%20su%20cuenta%20nueva");
        }
    } catch (error) {
        console.log('Error');

    }


});

router.get('/logout', (req, res, next) => {
    try {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect(`/`);
        })

    } catch (error) {
        console.log('Error');

    }

})


module.exports = router;