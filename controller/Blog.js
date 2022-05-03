import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import { BlogSchema } from "../utils/joiValidate.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const createBlog = async (req, res) => {
  try {
    let body = req.body;
    const { error, value } = BlogSchema.validate(body);
    if (error) {
      res.status(400).json({ success: false, msg: error.details[0].message });
    } else {
      const newBlog = new Blog(value);
      await newBlog.save();
      res.status(201).json(newBlog);
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};
export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const updateBlog = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const body = req.body;
    const { error, value } = BlogSchema.validate(body);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ success: false, msg: `Blog not found!` });
    } else if (error) {
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    } else {
      const updatedBlog = await Blog.findByIdAndUpdate(_id, value, {
        new: true,
      });
      return res.status(201).json(updatedBlog);
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, msg: `Blog not found!` });
    } else {
        let deletedBlog = await Blog.findByIdAndDelete(id);
        if(deletedBlog) {
            return res.status(201).json("Blog deleted successfully!");
        }else {
            return res.status(404).json({ success: false, msg: `Blog not found!` });
        }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const commentBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, msg: `Blog not found!` });
    } else {
      const { comment } = req.body;
      const blog = await Blog.findById(id);

      blog.comments.push({ userId: req.user._id, comment });

      const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
        new: true,
      });
      res.status(200).json(updatedBlog);
    }
  } catch (error) {
    console.log(error);
  }
};
