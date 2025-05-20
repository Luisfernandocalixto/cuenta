const express = require('express');
const { IndexController } = require('../controllers/IndexController.js');
const router = express.Router();


router.get('/', IndexController.index);



module.exports = router;
