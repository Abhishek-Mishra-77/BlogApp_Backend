import express from "express";
const router = express.Router();

import { getAllUsers, signUp } from "../controllers/userControllers.js";

router.get("/getUsers", getAllUsers);
router.post("/addUser", signUp);

export default router;
