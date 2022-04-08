const express = require("express");
const { getQueries, createQuery } = require("../controller/Query");
const router = express.Router();

router.get("/", getQueries);

router.post("/", createQuery);

module.exports = router;
