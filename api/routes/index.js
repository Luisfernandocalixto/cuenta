const express = require('express');
const { IndexController } = require('../controllers/indexController');
const router = express.Router();


router.get('/', IndexController.index);



module.exports = router;
