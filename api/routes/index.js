const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        
        res.sendFile(path.join(__dirname, '../../client/index.html'))
    } catch (error) {
        res.status(500).json({ message: 'Error of server!'});        
    }
});



module.exports = router;
