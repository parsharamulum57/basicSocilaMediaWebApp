const express=require('express');
const passport= require('passport');

const commentController=require('../controllers/commentController');

const route=express.Router();

console.log(`comment router loaded sucessfully`);


route.post('/add-comment',passport.checkAuthentication,commentController.commentCreate);
route.get('/destroy/:id',passport.checkAuthentication,commentController.commentDestroy);


module.exports=route;