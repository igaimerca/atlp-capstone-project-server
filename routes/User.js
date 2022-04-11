const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
  login,
  deleteAccount,
  deleteAllAccounts,
} = require("../controller/User");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", login);

router.patch("/:id", updateUser);
router.delete("/delete", authenticate, deleteAccount);
router.delete("/all", deleteAllAccounts);

module.exports = router;
