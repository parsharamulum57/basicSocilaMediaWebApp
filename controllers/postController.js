const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.postCreate = async function (req, res) {

    try {
        let newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','post published');
        return res.redirect('back');
    }
    catch (err) {
        console.log('Exception in post create ', err);
    }



};


module.exports.postDestroy = async function (req, res) {
    console.log("in posts destroy ", req.params);

    try {
        let post = await Post.findById(req.params.id)
        //.id means it converts objectID to the string format
        //console.log("in posts destroy ",post.user,req.user.id);
        if (post.user == req.user.id) {
            // console.log("in posts ",post.user,req.user._id);
            post.remove();
            req.flash('success','post deleted');
            await Comment.deleteMany({ post: req.params.id });

            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Exception in post Destroy ', err);
    }

};