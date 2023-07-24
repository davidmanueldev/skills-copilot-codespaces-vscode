// Create web server with node.js

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

// Create comment

router.post('/posts/:id/comments', isLoggedIn, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = new Comment(req.body.comment);
        comment.author = req.user._id;
        post.comments.push(comment);
        await comment.save();
        await post.save();
        req.flash('success', 'Comment added successfully!');
        res.redirect(`/posts/${post._id}`);
    } catch (e) {
        req.flash('error', 'Cannot add comment!');
        res.redirect('back');
    }
}
);

// Edit comment

router.get('/posts/:id/comments/:comment_id/edit', isLoggedIn, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.comment_id);
        res.render('comments/edit', { comment, post_id: req.params.id });
    } catch (e) {
        req.flash('error', 'Cannot edit comment!');
        res.redirect('back');
    }
}
);

// Update comment

router.put('/posts/:id/comments/:comment_id', isLoggedIn, async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
        req.flash('success', 'Comment updated successfully!');
        res.redirect(`/posts/${req.params.id}`);
    } catch (e) {
        req.flash('error', 'Cannot update comment!');
        res.redirect('back');
    }
}
);

// Delete comment

router.delete('/posts/:id/comments/:comment_id', isLoggedIn, async (req, res) => {  
    try {
        await Comment.findByIdAndRemove(req.params.comment_id);
        req.flash('success', 'Comment deleted successfully!');
        res.redirect(`/posts/${req.params.id}`);
    } catch (e) {
        req.flash('error', 'Cannot delete comment!');
        res.redirect('back');
    }
}
);

module.exports = router;