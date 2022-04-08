const express = require("express");
const { createUser, updateUser, getUsers } = require("../controller/User");
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

router.patch("/:id", updateUser);

module.exports = router;
