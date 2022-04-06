const express = require("express");
const { createBlog, getBlog, updateBlog, deleteBlog, getBlogs } = require("../controller/Blog");
const router = express.Router();

router.get("/blogs", getBlogs);

router.post("/blogs", createBlog);

router.get("/blogs/:id", getBlog);

router.patch("/blogs/:id", updateBlog);

router.delete("/blogs/:id", deleteBlog);

module.exports = router;
