const express=require('express');
const passport= require('passport');

const postController=require('../controllers/postController');

const route=express.Router();

console.log(`post router loaded sucessfully`);


route.post('/create-post',passport.checkAuthentication,postController.postCreate);
route.get('/destroy/:id',passport.checkAuthentication,postController.postDestroy);


module.exports=route;