const express = require("express");
const Blog = require("./models/Blog");
const router = express.Router();

router.get("/blogs", async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});

router.post("/blogs", async (req, res) => {
    let { title, banner, comments, likes, description } = req.body;

    const Blog = new Blog({ title, banner, comments, likes, description });
    await Blog.save();
    res.send(Blog);
});

router.get("/blogs/:id", async (req, res) => {
    try {
        const Blog = await Blog.findOne({ _id: req.params.id });
        res.send(Blog);
    } catch {
        res.status(404);
        res.send({ error: "Blog not found!" });
    }
});

router.patch("/blogs/:id", async (req, res) => {
    try {
        const Blog = await Blog.findOne({ _id: req.params.id });
        let { title, banner, comments, likes, description } = req.body;
        await Blog.save();
        res.send(Blog);
    } catch {
        res.status(404);
        res.send({ error: "Blog not found!" });
    }
});

router.delete("/blogs/:id", async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id });
        res.status(204).send({ status: true, message: "Blog deleted successfully" });
    } catch {
        res.status(404);
        res.send({ error: "Blog not found!" });
    }
});

module.exports = router;
