const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ManualAuthentication');

const db=mongoose.connection;

db.on('error',console.error.bind('error occured in connecting to database'));


db.once('open',function(){
    console.log('sucesssfully connected to database');
});