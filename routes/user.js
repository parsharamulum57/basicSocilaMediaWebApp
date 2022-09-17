const express=require('express');
const userProfileController=require('../controllers/userController');
const passport= require('passport');

const route=express.Router();

console.log(`user router loaded sucessfully`);

route.get('/profile',passport.checkAuthentication,userProfileController.userProfile);
route.get('/signup',userProfileController.userSignup);
route.get('/signin',userProfileController.userSignin);
route.post('/create',userProfileController.userCreate);
route.get('/signout',userProfileController.destroySession);

//using passport as a middle-ware to authenticate
route.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
),userProfileController.userCreateSession);

module.exports=route;


