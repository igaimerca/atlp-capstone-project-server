import express from "express";
import { createBlog, getBlog, updateBlog, deleteBlog, getBlogs, commentBlog } from "../controller/Blog.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getBlogs);

router.post("/create", authenticate, createBlog);

router.get("/:id", getBlog);

router.put("/:id", authenticate, updateBlog);

router.delete("/:id/delete", authenticate, deleteBlog);

router.patch("/comment/:id", authenticate, commentBlog);

export default router;
