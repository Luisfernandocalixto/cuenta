const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        
        res.sendFile(path.join(__dirname, '../../client/index.html'))
    } catch (error) {
        console.log('Error');
        
    }
});



module.exports = router;
