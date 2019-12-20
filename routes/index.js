var express = require("express");
const passport = require("passport");
var router = express.Router();

// Require controller modules.
var post_controller = require("../controllers/postController");
var comment_controller = require("../controllers/commentController");
var user_controller = require("../controllers/userController");

/// USER ROUTES ///
// POST request for creating User.
router.post("/users", user_controller.user_create);

/// POST ROUTES ///
// POST request for creating Post.
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_create
);

// DELETE request for a Post.
router.delete(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_delete
);

// PUT request to update Post.
router.put(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_update
);

// GET request for one Post.
router.get("/post/:id", post_controller.post_detail);

// GET request for list of all Post items.
router.get("/posts", post_controller.post_list);

/// COMMENT ROUTES ///
// POST request for creating Comment.
router.post("/comments", comment_controller.comment_create);

// DELETE request for a Comment.
router.delete(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  comment_controller.comment_delete
);

// PUT request to update Comment.
router.put(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  comment_controller.comment_update
);

// GET request for one Comment.
router.get("/comment/:id", comment_controller.comment_detail);

module.exports = router;
