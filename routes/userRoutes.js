import express from "express";
const router = express.Router();

import { getAllUsers, signUp  , login} from "../controllers/userControllers.js";

router.get("/getUsers", getAllUsers);
router.post("/addUser", signUp);
router.post("/login", login);

export default router;
