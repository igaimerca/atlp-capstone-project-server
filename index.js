import express from "express";
import mongoose from "mongoose";
import blogRoutes from "./routes/Blog.js";
import contactRoutes from "./routes/Query.js";
import userRoutes from "./routes/User.js";

import { config } from "dotenv";
config({ path: "./.env" });

mongoose
    .connect("mongodb://localhost:27017/portfolio", { useNewUrlParser: true })
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use("/blogs", blogRoutes);
        app.use("/contact", contactRoutes);
        app.use("/auth", userRoutes);

        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} && DB Connected`);
        });
    });
