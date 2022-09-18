const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.commentCreate = function (req, res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.comment,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                post.comments.push(comment);
                post.save();

                req.flash('success','comment posted');
                res.redirect('back');
            });
        }
    });
    
};


//using callback Hell
module.exports.commentDestroy=function(req,res){
    console.log("in comments destroy ",req.params);
    Comment.findById(req.params.id,function(err,comment){
        //.id means it converts objectID to the string format
        if(comment.user == req.user.id)
        {
            let postId=comment.post;
            comment.remove();
            req.flash('success','comment deleted');
            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    });
};