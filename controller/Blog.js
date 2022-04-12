
const mongoose = require('mongoose');
const Blog = require("../models/Blog");
const { BlogSchema } = require("../utils/joiValidate.js");


const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const createBlog = async (req, res) => {
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
}
const getBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json(error.message);
    }
}
const updateBlog = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const body = req.body;
        const { error, value } = BlogSchema.validate(body);
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res
                .status(404)
                .json({ success: false, msg: `Blog not found!` });
        } else if (error) {
            return res.status(400).json({ success: false, msg: error.details[0].message });
        } else {
            const updatedBlog = await Blog.findByIdAndUpdate(_id, value, {
                new: true,
            });
            return res.status(201).json(updatedBlog);
        }
    } catch (error) {
        console.log(error.message);
    }
}
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ success: false, msg: `Blog not found!` });
        } else {
            await Blog.findByIdAndDelete(id);
            return res.status(201).json("Blog deleted successfully!");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const commentBlog = async (req, res) => {
    const { id } = req.params;
    const {comment} = req.body;
    const blog = await Blog.findById(id);

    blog.comments.push(comment);

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
        new: true,
    });
    res.json(updatedBlog);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const value = req.body;
  
    const post = await PostMessage.findById(id);
  
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
  };

module.exports = {
    getBlogs, createBlog, updateBlog, getBlog, deleteBlog, commentBlog
}