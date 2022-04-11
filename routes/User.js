const express = require("express");
const { createUser, updateUser, getUsers, login, deleteAccount, deleteAllAccounts } = require("../controller/User");
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", login)

router.patch("/:id", updateUser);
router.delete("/delete/:id", deleteAccount);
router.delete("/all", deleteAllAccounts);

module.exports = router;
