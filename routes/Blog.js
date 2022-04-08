const express = require("express");
const { createBlog, getBlog, updateBlog, deleteBlog, getBlogs, commentBlog } = require("../controller/Blog");
const router = express.Router();

router.get("/", getBlogs);

router.post("", createBlog);

router.get("/:id", getBlog);

router.patch("/:id", updateBlog);

router.delete("/:id", deleteBlog);

router.patch("/comment/:id", commentBlog);

module.exports = router;
