const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;
const user = require('../models/user');

// authentication using passport.js
passport.use(new LocalStrategy(
    {
       usernameField: 'email'
    },function(email,password,done){

        user.findOne({email: email},function(err,user){
            if(err)
            {
                console.log('error in finding the user');
                return done(err);
            }
            if(!user || password !=user.password)
            {
                console.log('user not found');
                return done(null,false);
            }
            return done(null,user);
        });
    }));




//serilalizing the user to decide on which key should be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user._id);
});


//deserilalize the user from the key in cookies
passport.deserializeUser(function(id,done){
    user.findById(id,function(err,user){
        if(err)
        {
            console.log('error in finding the user');
            return done(err);
        }
        return done(null,user);
    });
});



// check if user is authenticated
passport.checkAuthentication=function(req,res,next){
   if(req.isAuthenticated())
   {
      return next();
   }
   return res.redirect('/users/signin');
};


passport.setAuthenticateduser=function(req,res,next){
    if(req.isAuthenticated())
   {
    //req---->res.local   ==> to user the user object in views
      res.locals.user=req.user;
   }
   next();
};

