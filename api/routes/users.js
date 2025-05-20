const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth.js');
const { UserController } = require('../controllers/userController.js');

router.get('/signin', UserController.getSignIn);

router.post('/signin', UserController.postSignIn);

router.get('/notes', isAuthenticated, UserController.getNotes);

router.get('/signup', UserController.getSignup);


router.post('/signup', UserController.postSignup);

router.get('/logout', UserController.logout);


module.exports = router;