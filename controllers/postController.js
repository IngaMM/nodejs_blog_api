var Post = require("../models/post");
var Comment = require("../models/comment");
var async = require("async");

// Display list of all Posts.
exports.post_list = function(req, res) {
  Post.find({}).exec(function(err, posts) {
    if (err) {
      return next(err);
    }
    res.json(posts);
  });
};

// Display detail page for a specific Post.
exports.post_detail = function(req, res, next) {
  async.parallel(
    {
      post: function(callback) {
        Post.findById(req.params.id).exec(callback);
      },

      post_comments: function(callback) {
        Comment.find({ post: req.params.id }, "content").exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.post == null) {
        // No results.
        var err = new Error("Post not found");
        err.status = 404;
        return next(err);
      }
      // Successful.
      res.json({
        title: results.post.title,
        content: results.post.content,
        timestamp: results.post.timestamp,
        published: results.post.published,
        comments: results.post_comments
      });
    }
  );
};

// Handle Post create on POST.
exports.post_create = function(req, res, next) {
  var post = new Post({
    title: req.body.title,
    content: req.body.content,
    timestamp: Date.now(),
    published: req.body.published
  });

  post.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.send("Post saved.");
    }
  });
};

// Handle Post delete on DELETE.
exports.post_delete = function(req, res, next) {
  async.parallel(
    {
      post: function(callback) {
        Post.findByIdAndRemove(req.params.id).exec(callback);
      },
      post_comments: function(callback) {
        Comment.find({ post: req.params.id })
          .remove()
          .exec(callback);
      }
    },
    function(err) {
      if (err) {
        return next(err);
      } else {
        res.send("Post and associated comments deleted.");
      }
    }
  );
};

// Handle Post update on PUT.
exports.post_update = function(req, res, next) {
  var post = new Post({
    title: req.body.title,
    content: req.body.content,
    timestamp: req.body.timestamp,
    published: req.body.published,
    _id: req.params.id
  });

  Post.findByIdAndUpdate(req.params.id, post, {}, function(err) {
    if (err) {
      return next(err);
    } else {
      res.send("Post updated.");
    }
  });
};
