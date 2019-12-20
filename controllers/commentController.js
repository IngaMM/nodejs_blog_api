var Comment = require("../models/comment");

// Display detail page for a specific Comment.
exports.comment_detail = function(req, res, next) {
  Comment.findById(req.params.id)
    .populate("post")
    .exec(function(err, comment) {
      if (err) {
        return next(err);
      }
      if (comment == null) {
        // No results.
        var err = new Error("Comment not found");
        err.status = 404;
        return next(err);
      }
      // Successful.
      res.json({
        _id: comment._id,
        content: comment.content,
        post: comment.post.title,
        author: comment.author,
        timestamp: comment.timestamp
      });
    });
};

// Handle Comment create on POST.
exports.comment_create = function(req, res, next) {
  var comment = new Comment({
    content: req.body.content,
    post: req.body.post,
    author: req.body.author,
    timestamp: Date.now()
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.send("Comment saved.");
    }
  });
};

// Handle Comment delete on DELETE.
exports.comment_delete = function(req, res, next) {
  Comment.findByIdAndRemove(req.params.id).exec(function(err) {
    if (err) {
      return next(err);
    } else {
      res.send("Comment deleted.");
    }
  });
};

// Handle Comment update on PUT.
exports.comment_update = function(req, res, next) {
  var comment = new Comment({
    content: req.body.content,
    post: req.body.post,
    author: req.body.author,
    timestamp: req.body.timestamp,
    _id: req.params.id
  });

  Comment.findByIdAndUpdate(req.params.id, comment, {}, function(err) {
    if (err) {
      return next(err);
    } else {
      res.send("Comment updated.");
    }
  });
};
