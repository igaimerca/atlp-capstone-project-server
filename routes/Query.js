import express from "express";
import { getQueries, createQuery } from "../controller/Query.js";
import authenticate from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", authenticate, getQueries);

router.post("/", createQuery);

export default router;
