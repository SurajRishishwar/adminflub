const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const db = require('./config/mongoose');

const port = process.env.PORT || 8000;
//const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.set('view engine','ejs')
app.set('views','./views');

app.use(session({
    name:'Admin',
    secret:'cheatingnii',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000*60*100)}
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log('started at port: ',port);
});