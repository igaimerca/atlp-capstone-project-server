import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  title: String,
  banner: String,
  comments: [Object],
  likes: Number,
  description: String,
});

export default mongoose.model("Blog", BlogSchema);
