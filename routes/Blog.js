const express = require("express");
const { createBlog, getBlog, updateBlog, deleteBlog, getBlogs, commentBlog } = require("../controller/Blog");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", getBlogs);

router.post("", authenticate, createBlog);

router.get("/:id", getBlog);

router.patch("/:id", authenticate, updateBlog);

router.delete("/:id", authenticate, deleteBlog);

router.patch("/comment/:id", commentBlog);

module.exports = router;
