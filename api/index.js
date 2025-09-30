require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { JWT_SECRET } = require('./config/config.js');
const jwt = require('jsonwebtoken');

// server
const app = express();
require('./database.js');
require('./config/passport.js');


app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(cookieParser());


// static files
app.use(express.static(path.join(__dirname,'..', '/public')));

// o
// const www = process.env.WWW || './';
// app.use(express.static(www));

app.use((req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.session.user = data
    } catch (error) {

    }
    next();
})



// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// routes
app.use(require('./routes/index.js'));
app.use(require('./routes/users.js'));


// server listening
app.listen(app.get('port'), () => {
    console.log(`Server listening on http://localhost:${app.get('port')}`);
})
