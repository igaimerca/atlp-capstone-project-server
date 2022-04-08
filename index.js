const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/Blog");
const contactRoutes = require("./routes/Query");

mongoose
    .connect("mongodb://localhost:27017/portfolio", { useNewUrlParser: true })
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use("/blogs", blogRoutes);
        app.use("/contact", contactRoutes)

        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} && DB Connected`);
        });
    });
