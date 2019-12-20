var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  content: { type: String },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true }
});

module.exports = mongoose.model("Post", PostSchema);
