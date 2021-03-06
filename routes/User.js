import express from "express";
import {
  createUser,
  updateUser,
  getUsers,
  login,
  deleteAccount,
  deleteAllAccounts,
} from "../controller/User.js";

import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/",authenticate, getUsers);
router.post("/register", createUser);
router.post("/login", login);

router.patch("/:id", authenticate, updateUser);
router.delete("/deactivate", authenticate, deleteAccount);
router.delete ("/all", authenticate, deleteAllAccounts);

export default router;
