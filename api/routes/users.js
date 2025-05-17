const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth.js');
const { UserController } = require('../controllers/userController.js');

router.get('/signin', UserController.getSignIn);

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/signin?error=error in session',
}));

// router.get('/api/user', async (req, res) => {
//     try {
//         if (req.isAuthenticated()) {
//             res.json({ name: req.user.name })
//         }
//         else {
//             res.status(401).json({ error: 'No autorizado, No ha iniciado sesión con su cuenta' });
//         }
//     } catch (error) {
//         console.log('Error');
//     }

// });

// redireccionar directamente a signin 
// router.get('/notes', isAuthenticated, async (req, res) => {  
router.get('/notes', isAuthenticated, UserController.getNotes);

router.get('/signup', UserController.getSignup);


router.post('/signup', UserController.postSignup);

router.get('/logout', UserController.logout);


module.exports = router;