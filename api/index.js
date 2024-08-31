require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

// server
const app = express();
require('./database.js');
require('./config/passport.js');


app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../css')));
app.use(express.static(path.join(__dirname, '../img')));
app.use(express.static(path.join(__dirname, '../js')));

// o
// const www = process.env.WWW || './';
// app.use(express.static(www));


// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: false,// no save the session no modifications
    saveUninitialized: false, // not saved sessions not initial
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        ttl: 2 * 24 * 60 * 60,
        autoRemove: 'native'
    })

}));


app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//     res.locals.user = req.user || null
//     next()
// })

// routes
app.use(require('./routes/index.js'));
app.use(require('./routes/users.js'));


// server listening
app.listen(app.get('port'), () => {
    console.log(`Server listening on http://localhost:${app.get('port')}`);
})

