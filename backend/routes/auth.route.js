import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";

const router = express.Router();

// Define Routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
