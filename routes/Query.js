const express = require("express");
const { getQueries, createQuery } = require("../controller/Query");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", authenticate, getQueries);

router.post("/", createQuery);

module.exports = router;
