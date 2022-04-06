
const Blog = require("./models/Blog");
const { BlogSchema } = require("../utils/joiValidate.js");


const getBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
}

const createBlog = async (req, res) => {
    let { title, banner, comments, likes, description } = req.body;

    const Blog = new Blog({ title, banner, comments, likes, description });
    await Blog.save();
    res.send(Blog);
}
const getBlog = async (req, res) => {
    try {
        const Blog = await Blog.findOne({ _id: req.params.id });
        res.send(Blog);
    } catch {
        res.status(404);
        res.send({ error: "Blog not found!" });
    }
}
const updateBlog = async (req, res) => {
    try {
        const Blog = await Blog.findOne({ _id: req.params.id });
        let { title, banner, comments, likes, description } = req.body;
        await Blog.save();
        res.send(Blog);
    } catch {
        res.status(404);
        res.send({ error: "Blog not found!" });
    }
}
const deleteBlog = async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id });
        res.status(204).send({ status: true, message: "Blog deleted successfully" });
    } catch {
        res.status(404);
        res.send({ error: "Blog not found!" });
    }
}

module.exports = {
    getBlogs, createBlog, updateBlog, getBlog, deleteBlog
}