
const user = require('../models/user');

module.exports.userProfile = function (req, res) {
    return res.render('userProfile', {
        title: 'User Profile'
    });

};

module.exports.userSignup = function (req, res) {
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('signup', {
        title: 'SignUp'
    });

};

module.exports.userSignin = function (req, res) {
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('signin', {
        title: 'SignIn'
    });

};

module.exports.userCreate = function (req, res) {
    console.log(req.body);
    user.create(req.body, function (err, newUser) {
        if (err) {
            console.log('error in creating the user', err);
            return;
        }
        console.log('********* ', newUser);
    });
    return res.redirect('/users/signin');

};


module.exports.userCreateSession = function (req, res) {
    console.log(req.body);
    /*user.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding the user', err);
            return;
        }
        console.log('********* ', user);
        if (user) {
            if (user.password == req.body.password) {
                res.cookie('user_id', user._id);
                return res.redirect('/users/profile');
            }
            
                return res.redirect('/users/signin');
            

        }
        else {
            return res.redirect('/users/signin');

        }
    });*/
    return res.redirect('/');
    


};


module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { console.log('error in logout'); }
        
      });
    return res.redirect('/');
};

