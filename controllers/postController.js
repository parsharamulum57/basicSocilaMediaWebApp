const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.postCreate = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function (err, newPost) {
        if (err) {
            console.log('error in creating the post', err);
            return;
        }
        console.log('********* ', newPost);
    });
    return res.redirect('back');

};


module.exports.postDestroy=function(req,res){
    console.log("in posts destroy ",req.params);
    Post.findById(req.params.id,function(err,post){
        //.id means it converts objectID to the string format
        //console.log("in posts destroy ",post.user,req.user.id);
        if(post.user == req.user.id)
        {
           // console.log("in posts ",post.user,req.user._id);
            post.remove();
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    });
};