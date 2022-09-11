const express=require('express');
const homeController=require('../controllers/homeController');

const route=express.Router();




console.log(`router loaded sucessfully`);
route.get('/',homeController.home);
route.use('/users',require('./user'));


module.exports=route;