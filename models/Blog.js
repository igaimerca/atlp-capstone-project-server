const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  title: String,
  banner: String,
  comments: [String],
  likes: Number,
  description: String,
});

module.exports = mongoose.model("Blog", BlogSchema);
