const Post=require('../models/post');

module.exports.home=function(req,res){

    /* Post.find({},function(err,posts){

        return res.render('home',{
            title: 'Home',
            posts: posts
        });
    });
     */

    //to populte the user
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){

        if(err)
        {
            console.log("error is fec=tching posts ",err);
            return;
        }
       // console.log("posts ",posts);
        return res.render('home',{
            title: 'Home',
            posts: posts
        });
    });
};