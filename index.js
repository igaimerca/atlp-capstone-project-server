const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/Blog");

mongoose
    .connect("mongodb://localhost:27017/portfolio", { useNewUrlParser: true })
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use("/api", blogRoutes);

        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} && DB Connected`);
        });
    });
