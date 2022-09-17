const cookieParser = require('cookie-parser');
const express=require('express');
const port=3000;
const expressLayouts = require('express-ejs-layouts');

//used for session-cookie
const expressSession= require('express-session');

//used for authentication
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');

const MongoStore=require('connect-mongo');

const app=express();
const db=require('./config/mongoose');

//using sass
const sassMiddleWare=require('node-sass-middleware');
app.use(sassMiddleWare({
    src: './assests/scss',
    dest: './assests/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(express.static('./assests'));
app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set('layout extractScripts', true);


app.use(cookieParser());

app.use(expressSession({
    name:'passportAuthentication',
    secret: 'havingfun',
    saveUnintialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*300)
    },
    //mongoStore is used to store the session cookie in the DB
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ManualAuthentication',
        autoRemove: 'disabled'
    },function(err){
        if(err)
        {
            console.log('error occured in MongoStore');
        }
        console.log('successfully connected to mongoStore');

    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateduser);


app.set('view engine', 'ejs');
app.set('views','./views');

const routes=require('./routes/index');
const { Store } = require('express-session');


app.use('/',routes);




app.listen(port,function(err){
    if(err)
    {
        console.log(`error occured in starting the server ${err}`);
        return ;
    }
    console.log(`app is sucessfully started on port ${port}`);
});