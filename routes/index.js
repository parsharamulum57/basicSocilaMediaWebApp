const express=require('express');
const homeController=require('../controllers/homeController');

const route=express.Router();




console.log(`router loaded sucessfully`);
route.get('/',homeController.home);
route.use('/users',require('./user'));
route.use('/posts',require('./post'));
route.use('/comments',require('./comment'));

module.exports=route;